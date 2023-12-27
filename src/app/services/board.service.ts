import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Song } from './data';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private readonly dataService: DataService) {}

  public getRandomboard(): Song[][] {
    const allSongs = this.dataService.getAllSongs();
    const board = [];

    let column = [];
    for (let i = 0; i <= 15; i++) {
      column.push(allSongs[i]);

      if ((i + 1) % 5 === 0) {
        board.push(column);
        column = [];
      }
    }
    return board;
  }
}
