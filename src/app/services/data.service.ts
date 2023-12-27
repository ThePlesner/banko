import { Injectable } from '@angular/core';
import { Song, songs } from './data';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly baseData = songs;

  constructor() {}

  public getAllSongs(): Song[] {
    return this.baseData;
  }
}
