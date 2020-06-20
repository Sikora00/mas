import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  public ws = webSocket<any>('ws://localhost:3333');

  constructor() {}

  connect(userId: string): void {
    this.ws.next({ event: 'connect', data: { userId } });
  }
}
