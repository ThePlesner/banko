import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private readonly dataService: DataService) {}

  public getRandomboard() {
    return this.dataService.getAllSongs();
  }
}
