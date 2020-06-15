import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _audioSource = new BehaviorSubject<URL>(null);

  audioSource = this._audioSource.asObservable();

  constructor() {}
}
