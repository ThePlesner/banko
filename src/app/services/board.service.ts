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

    let row = [];
    for (let i = 0; i < allSongs.length; i++) {
      row.push(allSongs[i]);

      if ((i + 1) % 5 === 0) {
        board.push(row);
        row = [];
      }
    }
    return board;
  }
}
