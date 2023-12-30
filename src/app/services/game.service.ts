import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from './lobby.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private url = `http://${environment.ip}:${environment.serverPort}/api/game`;

  constructor(private readonly httpClient: HttpClient) {}

  public getGame(id: string): Observable<Game> {
    return this.httpClient
      .get<{ game: Game }>(this.url + `/${id}`)
      .pipe(map((gameResponse) => gameResponse.game));
  }
}
