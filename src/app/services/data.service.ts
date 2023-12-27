import { Injectable } from '@angular/core';
import { Song, songs } from './data';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly baseData = songs;

  constructor() {}

  public getAllSongs(): Song[] {
    return this.shuffleArray(this.baseData);
  }

  private shuffleArray(array: Song[]): Song[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
