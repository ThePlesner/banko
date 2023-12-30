import { Dialog } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateLobbyDialogComponent } from 'src/app/components/create-lobby-dialog/create-lobby-dialog.component';
import { CreateUserDialogComponent } from 'src/app/components/create-user-dialog/create-user-dialog.component';
import { Game, LobbyService } from 'src/app/services/lobby.service';
import { UtilService } from 'src/app/services/util.service';
import { environment } from 'src/environments/environment';

interface LobbyResponse {
  games: any[];
}

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.scss',
})
export class LobbyComponent implements OnInit {
  public games: Game[] = [];

  constructor(
    private readonly dialog: Dialog,
    private readonly lobbyService: LobbyService,
    private readonly router: Router,
    private readonly httpClient: HttpClient
  ) {}

  public ngOnInit(): void {
    this.lobbyService
      .getGames()
      .subscribe((response) => (this.games = response.games));
  }

  public createGame() {
    const gameId = UtilService.randomId();
    this.dialog
      .open<string>(CreateLobbyDialogComponent, { disableClose: true })
      .closed.subscribe((lobbyName) => {
        this.lobbyService
          .createGame({
            gameId,
            lobbyName: lobbyName ?? '',
          })
          .subscribe((gameCreated) => {});
      });
  }

  public goToGame(id: string) {
    this.dialog
      .open<string>(CreateUserDialogComponent, { disableClose: true })
      .closed.subscribe((userName) => {
        const userId = UtilService.randomId();

        return this.httpClient
          .post(
            `http://${environment.ip}:${environment.serverPort}/api/createUser`,
            {
              gameId: id,
              userId,
              userName,
            }
          )
          .subscribe((response) => {
            this.router.navigate([`/games/${id}`]);
          });
      });
  }
}
