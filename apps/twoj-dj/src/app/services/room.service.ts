import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { urlFactory } from '@valueadd/typed-urls';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  pluck,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Room } from '../models/room.model';
import { Song } from '../models/song.model';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private _currentSong = new BehaviorSubject<Song>(null);
  private _queue = new BehaviorSubject<Song[]>(null);
  private _rooms = new BehaviorSubject(null);
  private _selectedRoom = new BehaviorSubject<Room>(null);

  currentSong$ = this._currentSong.asObservable();
  queue$ = this._queue.asObservable();
  rooms$ = this._rooms.asObservable();

  private endpoints = {
    getRooms: urlFactory('/api/room'),
    join: urlFactory<'id'>('/api/room/:id/user', true),
    leave: urlFactory<'id'>('/api/room/:id/user', true),
    queueSong: urlFactory<'roomId' | 'songId'>(
      '/api/room/:roomId/song/:songId',
      true
    ),
    getRoom: urlFactory<'id'>('/api/room/:id', true),
  };
  selectedRoom$: Observable<Room> = this._selectedRoom
    .asObservable()
    .pipe(distinctUntilChanged());

  constructor(
    private http: HttpClient,
    private ws: WebSocketService,
    private router: Router
  ) {
    this.ws.ws
      .pipe(
        filter((event) => event.event === 'currentSong'),
        pluck('currentSong')
      )
      .subscribe((song) => this._currentSong.next(song));
    this.ws.ws
      .pipe(
        filter((event) => event.event === 'queue'),
        pluck('queue')
      )
      .subscribe((queue) => this._queue.next(queue));
  }

  getRooms(roomId?: string): Observable<Room[]> {
    return this.http
      .get<Room[]>(this.endpoints.getRooms.url(), {
        params: roomId ? { id: roomId } : {},
      })
      .pipe(
        tap((rooms) => {
          this._rooms.next(rooms);
        })
      );
  }

  join(roomId: string): Observable<Room> {
    return this.http.get<Room>(this.endpoints.getRoom.url({ id: roomId })).pipe(
      tap((room) => {
        this._selectedRoom.next(room);
        this._currentSong.next(room.currentSong);
        this._queue.next(room.queue);
      }),
      switchMap((room) =>
        this.http
          .post<void>(this.endpoints.join.url({ id: roomId }), null)
          .pipe(map(() => room))
      )
    );
  }

  queueSong(roomId: string, songId: string): void {
    this.http
      .post<void>(this.endpoints.queueSong.url({ roomId, songId }), null)
      .subscribe();
  }

  leave(userId: string): void {
    this.ws.ws.next({
      event: 'leave',
      data: { userId, roomId: this._selectedRoom.value.id },
    });
  }
}
