import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlFactory } from '@valueadd/typed-urls';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private _rooms = new BehaviorSubject([]);
  private _selectedRoomId = new BehaviorSubject<string>(null);

  rooms$ = this._rooms.asObservable();

  private endpoints = {
    getRooms: urlFactory<'id'>('/api/room/:id', true),
    join: urlFactory<'id'>('/api/room/:id/user', true),
  };
  selectedRoom$ = this._selectedRoomId.pipe(
    switchMap((roomId) =>
      this.rooms$.pipe(map((rooms) => rooms.find((room) => room.id === roomId)))
    )
  );

  constructor(private http: HttpClient) {}

  getRooms(roomId: string): Observable<Room[]> {
    return this.http
      .get<Room[]>(this.endpoints.getRooms.url({ id: roomId }))
      .pipe(
        tap((rooms) => {
          this._rooms.next(rooms);
        })
      );
  }

  select(roomId: string): void {
    this._selectedRoomId.next(roomId);
    this.http
      .post<void>(this.endpoints.join.url({ id: roomId }), null)
      .subscribe();
  }
}
