import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { ExternalRadioSelectionDialogComponent } from '../../components/external-radio-selection-dialog/external-radio-selection-dialog.component';
import { ExternalRadio } from '../../models/external-radio.model';
import { Room } from '../../models/room.model';
import { ExternalRadioService } from '../../services/external-radio.service';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'mas-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioComponent implements OnInit {
  sidebarOpened = false;
  rooms$ = this.roomService.rooms$;
  selectedRoom$ = this.roomService.selectedRoom$;
  audioSrc$ = of(
    'http://localhost:3333/api/room/9F7CAD36-B722-4EBF-8345-CF7181659918/stream'
  );
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

  onSelectRoom(room: Room): void {
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
