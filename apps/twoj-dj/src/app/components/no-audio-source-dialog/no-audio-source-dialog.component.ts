import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mas-no-audio-source-dialog',
  templateUrl: './no-audio-source-dialog.component.html',
  styleUrls: ['./no-audio-source-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoAudioSourceDialogComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
