import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Song } from './data';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private readonly dataService: DataService) {}

  public getRandomboard(): Observable<Song[][]> {
    return this.dataService.getAllSongs().pipe(
      map((songs) => {
        const board = [];

        let column = [];
        for (let i = 0; i <= 15; i++) {
          column.push(songs[i]);

          if ((i + 1) % 5 === 0) {
            board.push(column);
            column = [];
          }
        }
        return board;
      })
    );
  }
}
