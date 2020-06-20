import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlFactory } from '@valueadd/typed-urls';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Song } from '../models/song.model';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  private _songs = new BehaviorSubject([]);

  songs$ = this._songs.asObservable();

  private endpoints = {
    getSongs: urlFactory('/api/song'),
  };

  constructor(private http: HttpClient, private ws: WebSocketService) {}

  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(this.endpoints.getSongs.url()).pipe(
      tap((songs) => {
        this._songs.next(songs);
      })
    );
  }
}
