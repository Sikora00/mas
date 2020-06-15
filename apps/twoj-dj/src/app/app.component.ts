import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from './models/room.model';
import { filter, first, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ExternalRadioSelectionDialogComponent } from './components/external-radio-selection-dialog/external-radio-selection-dialog.component';
import { ExternalRadio } from './models/external-radio.model';
import { ExternalRadioService } from './services/external-radio.service';
import { RoomService } from './services/room.service';

@Component({
  selector: 'mas-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  sidebarOpened = false;
  rooms$ = this.roomService.rooms$;
  selectedRoom$ = this.roomService.selectedRoom$;
  audioSrc$;
  selectedExternalRadio$ = this.externalRadioService.selectedExternalRadio$;

  constructor(
    private dialog: MatDialog,
    private externalRadioService: ExternalRadioService,
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const selectedRoomId = this.route.snapshot.paramMap.get('roomId');
    if (selectedRoomId) {
      this.roomService
        .getRooms(selectedRoomId)
        .pipe(tap(() => this.roomService.select(selectedRoomId)))
        .subscribe();
    }
    this.externalRadioService.getAll();
  }

  onToggleMenu(): void {
    this.sidebarOpened = !this.sidebarOpened;
  }

  onNavigateToRoom(roomId: string): void {
    this.router.navigate([roomId]);
  }

  onSelectRoom(room: Room) {
    this.roomService.select(room.id);
  }

  onChangeExternalRadio(): void {
    this.externalRadioService.externalRadios$
      .pipe(first())
      .subscribe((externalRadios) => {
        this.dialog
          .open(ExternalRadioSelectionDialogComponent, {
            data: { externalRadios },
            panelClass: 'radio-stations-dialog',
          })
          .afterClosed()
          .pipe(filter<ExternalRadio>(Boolean))
          .subscribe((result) => {
            this.externalRadioService.select(result);
          });
      });
  }
}
