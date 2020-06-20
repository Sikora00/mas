import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlFactory } from '@valueadd/typed-urls';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { AudioSource } from '../models/audio-source';
import { User } from '../models/user.model';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _audioSource = new BehaviorSubject<AudioSource>(null);
  private readonly _currentUser = new BehaviorSubject<User>(null);

  audioSource$ = this._audioSource.asObservable();
  currentUser$ = this._currentUser.asObservable();

  private readonly endpoints = {
    getCurrentUser: urlFactory('api/user/current'),
  };

  get currentUser(): User {
    return this._currentUser.value;
  }

  constructor(private http: HttpClient, private ws: WebSocketService) {
    this.ws.ws
      .asObservable()
      .pipe(filter((event) => event.event === 'source'))
      .subscribe((src) => this._audioSource.next(src));
    this.ws.connect('CBA99AC3-97AF-4906-A120-6BEF5B41674E');
  }

  getCurrentUser(): Observable<User> {
    return this.http
      .get<User>(this.endpoints.getCurrentUser.url())
      .pipe(tap((user) => this._currentUser.next(user)));
  }
}
