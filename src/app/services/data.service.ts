import { Injectable } from '@angular/core';
import { Song, songs } from './data';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url = `http://${environment.ip}:${environment.serverPort}/api/songs`;
  private readonly baseData = songs;

  constructor(private readonly httpClient: HttpClient) {}

  public getAllSongs() {
    return this.httpClient
      .get<{ songs: Song[] }>(this.url)
      .pipe(map((songs) => this.shuffleArray(songs.songs)));

    // return this.shuffleArray(this.baseData);
  }

  private shuffleArray(array: Song[]): Song[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
