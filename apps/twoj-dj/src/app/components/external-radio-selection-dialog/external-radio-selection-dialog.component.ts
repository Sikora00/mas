import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import { ExternalRadio } from '../../models/external-radio.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'mas-external-radio-selection-dialog',
  templateUrl: './external-radio-selection-dialog.component.html',
  styleUrls: ['./external-radio-selection-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExternalRadioSelectionDialogComponent {
  externalRadios: ExternalRadio[];

  constructor(
    private dialogRef: MatDialogRef<ExternalRadioSelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.externalRadios = data.externalRadios;
  }

  select(externalRadio: ExternalRadio): void {
    this.dialogRef.close(externalRadio);
  }
}
