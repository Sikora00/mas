import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { filter, first, switchMap, tap } from 'rxjs/operators';
import { ExternalRadioSelectionDialogComponent } from '../../components/external-radio-selection-dialog/external-radio-selection-dialog.component';
import { NoAudioSourceDialogComponent } from '../../components/no-audio-source-dialog/no-audio-source-dialog.component';
import { QueueSongDialogComponent } from '../../components/queue-song-dialog/queue-song-dialog.component';
import { ExternalRadio } from '../../models/external-radio.model';
import { Room } from '../../models/room.model';
import { Song } from '../../models/song.model';
import { ExternalRadioService } from '../../services/external-radio.service';
import { RoomService } from '../../services/room.service';
import { SongService } from '../../services/song.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'mas-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioComponent implements OnInit, OnDestroy {
  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(): void {
    this.roomService.leave(this.userService.currentUser.id);
  }

  audioSrc$ = this.userService.audioSource$;
  currentSong$ = this.roomService.currentSong$;
  queue$ = this.roomService.queue$;
  rooms$ = this.roomService.rooms$;
  selectedRoom$ = this.roomService.selectedRoom$;
  selectedExternalRadio$ = this.externalRadioService.selectedExternalRadio$;
  sidebarOpened = false;

  private externalRadioSub: Subscription;
  private selectedRoomSub: Subscription;

  constructor(
    private dialog: MatDialog,
    private externalRadioService: ExternalRadioService,
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router,
    private songService: SongService,
    private userService: UserService
  ) {}

  ngOnDestroy(): void {
    this.externalRadioSub.unsubscribe();
    this.selectedRoomSub.unsubscribe();
  }

  ngOnInit(): void {
    this.externalRadioSub = this.externalRadioService
      .getAll()
      .pipe(
        switchMap((externalRadios) =>
          this.userService.currentUser$.pipe(
            tap((user) => {
              if (user.selectedExternalRadioId) {
                this.externalRadioService.select(
                  externalRadios.find(
                    (radio) => radio.id === user.selectedExternalRadioId
                  )
                );
              }
            })
          )
        )
      )
      .subscribe();

    this.selectedRoomSub = this.selectedRoom$
      .pipe(filter<Room>(Boolean))
      .subscribe((selectedRoom) =>
        this.router.navigate(['room', selectedRoom.id], { replaceUrl: true })
      );
  }

  onToggleMenu(): void {
    this.sidebarOpened = !this.sidebarOpened;
  }

  onNavigateToRoom(roomId: string): void {
    this.router.navigate([roomId]);
  }

  onSelectRoom(room: Room): void {
    this.roomService.join(room.id).subscribe();
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

  onQueueSong(): void {
    combineLatest([
      this.songService
        .getSongs()
        .pipe(
          switchMap((songs) =>
            this.dialog
              .open(QueueSongDialogComponent, { data: { songs } })
              .afterClosed()
              .pipe(first(), filter(Boolean))
          )
        ),
      this.selectedRoom$,
    ])
      .pipe(first())
      .subscribe(([song, room]: [Song, Room]) =>
        this.roomService.queueSong(room.id, song.id)
      );
  }

  onNoAudioSource(): void {
    this.dialog.open(NoAudioSourceDialogComponent);
  }
}
