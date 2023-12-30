import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Game {
  gameId: string;
  lobbyName: string;
}

export interface GetGamesResponse {
  games: Game[];
}

@Injectable({
  providedIn: 'root',
})
export class LobbyService {
  private url = `http://${environment.ip}:${environment.serverPort}/api/lobby`;
  constructor(private readonly httpClient: HttpClient) {}

  public getGames(): Observable<any> {
    return this.httpClient.get(this.url);
  }

  public createGame(game: Game) {
    return this.httpClient.post(this.url, game, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
