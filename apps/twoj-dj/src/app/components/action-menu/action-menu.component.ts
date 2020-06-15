import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'mas-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionMenuComponent implements OnInit {
  @Output()
  changeExternalRadioStation = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onChangeExternalRadio(): void {
    this.changeExternalRadioStation.emit();
  }
}
