import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';
import { Room } from '../../models/room.model';

@Component({
  selector: 'mas-rooms-menu',
  templateUrl: './rooms-menu.component.html',
  styleUrls: ['./rooms-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsMenuComponent implements OnInit {
  @Input()
  rooms: Room[];
  @Input()
  selectedRoom: Room;

  @Output()
  selectRoom = new EventEmitter<Room>();

  constructor() {}

  ngOnInit(): void {}

  onSelectRoom(room: Room): void {
    this.selectRoom.emit(room);
  }
}
