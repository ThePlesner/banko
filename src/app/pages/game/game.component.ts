import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, take, tap } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { BoardComponent } from 'src/app/components/board/board.component';
import { Song } from 'src/app/services/data';
import { GameService } from 'src/app/services/game.service';
import { UtilService } from 'src/app/services/util.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [BoardComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {
  public lobbyName: string = '';
  public board: Song[][] = [];
  private socket?: Socket;

  constructor(
    private readonly gameService: GameService,
    private readonly route: ActivatedRoute,
    private readonly httpClient: HttpClient
  ) {}

  public ngOnInit(): void {
    const gameId = this.route.snapshot.params['id'];

    this.gameService
      .getGame(gameId)
      .pipe(
        take(1),
        tap((game) => (this.lobbyName = game.lobbyName))
      )
      .subscribe((game) => {});

    this.socket = io(`http://${environment.ip}:${environment.serverPort}`);
  }

  public reset() {
    localStorage.setItem('boards', '');
  }

  public showDialog() {}
}
