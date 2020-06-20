import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { exhaustMap, map, switchMap } from 'rxjs/operators';
import { RoomService } from '../../services/room.service';

@Injectable({
  providedIn: 'root',
})
export class RadioGuard implements CanActivateChild {
  constructor(private roomService: RoomService, private router: Router) {}

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | UrlTree {
    const selectedRoomId = next.paramMap.get('roomId');
    return this.roomService.rooms$.pipe(
      exhaustMap((savedRooms) => {
        if (savedRooms) {
          return this.roomService.join(selectedRoomId).pipe(map(Boolean));
        } else {
          return this.roomService.getRooms(selectedRoomId).pipe(
            switchMap((rooms) => {
              if (!rooms || rooms.length === 0) {
                return of(this.router.parseUrl('/404'));
              } else if (!selectedRoomId) {
                return of(this.router.parseUrl(`/room/${rooms[0].id}`));
              }
              return this.roomService.join(selectedRoomId).pipe(map(Boolean));
            })
          );
        }
      })
    );
  }
}
