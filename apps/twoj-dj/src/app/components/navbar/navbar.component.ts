import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'mas-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  @Output()
  navigateToRoom = new EventEmitter<string>();
  @Output()
  toggleSidebar = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}

  onOpenMenu(): void {
    this.toggleSidebar.emit();
  }
}
