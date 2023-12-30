const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const cors = require("cors");
const fsp = require("fs/promises");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:4200", "http://192.168.0.12:4200"],
  },
});
const port = 3000;
const ip = "192.168.0.12";

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:4200", `http://${ip}:4200`],
  })
);

app.use(
  express.static(path.join(__dirname, "..", "dist", "banko"), {
    setHeaders: (res, path) => {
      if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
    },
  })
);

const apiRouter = express.Router();

apiRouter.post("/lobby", async (req, res) => {
  const body = req.body;

  const db = await fsp.readFile(path.join("server", "db.json"));
  const parsedDb = JSON.parse(db);

  // parsedDb.games.push({ ...body, users: [] });
  parsedDb.games[body.gameId] = { ...body, users: [] };

  const stringifiedDb = JSON.stringify(parsedDb, null, 2);
  await fsp.writeFile(path.join("server", "db.json"), stringifiedDb);
});

apiRouter.get("/lobby", async (req, res) => {
  const db = await fsp.readFile(path.join("server", "db.json"));
  const parsedDb = JSON.parse(db);

  const games = Object.keys(parsedDb.games).map((key) => {
    return {
      gameId: parsedDb.games[key].gameId,
      lobbyName: parsedDb.games[key].lobbyName,
    };
  });

  res.send(JSON.stringify({ games }));
});

apiRouter.get("/game/:id", async (req, res) => {
  const id = req.params.id;

  const db = await fsp.readFile(path.join("server", "db.json"));
  const parsedDb = JSON.parse(db);

  const games = parsedDb.games;
  const game = games[id];

  res.send(JSON.stringify({ game }));
});

apiRouter.get("/songs", async (req, res) => {
  const db = await fsp.readFile(path.join("server", "db.json"));
  const parsedDb = JSON.parse(db);

  const songs = parsedDb.songs;

  res.send(JSON.stringify({ songs }));
});

apiRouter.post("/createUser", async (req, res) => {
  const db = await fsp.readFile(path.join("server", "db.json"));
  const parsedDb = JSON.parse(db);

  const body = req.body;

  const game = parsedDb.games[body.gameId];

  game.users.push({
    id: body.userId,
  });

  parsedDb[body.gameId] = game;

  const stringifiedDb = JSON.stringify(parsedDb, null, 2);
  await fsp.writeFile(path.join("server", "db.json"), stringifiedDb);

  res.sendStatus(200);
});

app.use("/api", apiRouter);

app.get("/", (req, res) => {
  console.log(path.join(__dirname, "..", "dist", "banko", "index.html"));
  res.sendFile(path.join(__dirname, "..", "dist", "banko", "index.html"));
});

io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle custom events here
  socket.on("chat message", (msg) => {
    console.log(`Message: ${msg}`);
    io.emit("chat message", msg); // Broadcast the message to all connected clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port, ip, () => {
  console.log(`Server is running on http://${ip}:${port}`);
});
