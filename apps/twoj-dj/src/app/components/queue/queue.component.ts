import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Song } from '../../models/song.model';

@Component({
  selector: 'mas-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QueueComponent implements OnInit {
  @Input()
  queue: Song[];
  constructor() {}

  ngOnInit(): void {}
}
