import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mas-room-not-found',
  templateUrl: './room-not-found.component.html',
  styleUrls: ['./room-not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomNotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
