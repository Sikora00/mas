import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Song } from '../../models/song.model';

@Component({
  selector: 'mas-queue-song-dialog',
  templateUrl: './queue-song-dialog.component.html',
  styleUrls: ['./queue-song-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QueueSongDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { songs: Song[] },
    private dialogRef: MatDialogRef<QueueSongDialogComponent>
  ) {}

  ngOnInit(): void {}

  select(song: Song): void {
    this.dialogRef.close(song);
  }
}
