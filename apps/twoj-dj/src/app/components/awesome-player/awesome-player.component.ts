import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { of } from 'rxjs';
import { delay, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AudioSource } from '../../models/audio-source';
import { ExternalRadio } from '../../models/external-radio.model';
import { Room } from '../../models/room.model';
import { Song } from '../../models/song.model';
import { AudioSourceReceivedAction } from '../../payloads/audio-source-received.action';
import { Framer } from './framer';
import { Player } from './player';
import { Scene } from './scene';
import { Tracker } from './tracker';

@Component({
  selector: 'sdj-awesome-player',
  templateUrl: './awesome-player.component.html',
  styleUrls: [
    './awesome-player.component.scss',
    './awesome-player.component.mobile.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AwesomePlayerComponent
  implements OnInit, OnDestroy, AfterViewInit {
  @Input()
  currentSong: Song;
  @Input()
  externalRadio: ExternalRadio;

  @Input()
  set src(value: AudioSourceReceivedAction | null) {
    if (!value) {
      return;
    }
    this._src = value?.source?.toString();
    this.sourceType = value.type;
    if (value.type === AudioSource.None) {
      setTimeout(() => {
        this.onPause();
        this.player.unmute();
        this.cdR.markForCheck();
      }, 300);
      this.player.mute();
    }
    if (this.player) {
      this.player.src = this._src;
    }
  }

  @Input()
  room: Room;

  @Output()
  noAudioSource = new EventEmitter<void>();

  elementSize: number;
  isMuted = false;
  isPlayerLoading$ = of(false);
  isPlaying = false;
  sourceType: AudioSource;

  public player: Player;
  private framer: Framer;

  private scene: Scene;
  private _src: string;

  @HostListener('window:resize')
  onResize(): void {
    this.setElementSize();
  }

  constructor(
    private cdR: ChangeDetectorRef,
    private elementRef: ElementRef<HTMLElement>
  ) {}

  ngOnDestroy(): void {
    this.player.destroy();
    this.scene.stopRender();
  }

  ngOnInit(): void {
    this.setElementSize();
  }

  async ngAfterViewInit(): Promise<void> {
    this.framer = new Framer();
    const tracker = new Tracker();
    this.framer.tracker = tracker;

    this.scene = new Scene(this.framer, tracker);
    this.setElementSize();
    this.player = new Player(this.scene, this.framer);
    tracker.player = this.player;

    this.player.init();
    this.player.src = this._src;
    this.isPlayerLoading$ = this.player.isLoadingChange$.pipe(
      distinctUntilChanged(),
      switchMap((value) => of(value).pipe(delay(500)))
    );
  }

  setElementSize(): void {
    const sizeBaseNode: HTMLElement = this.elementRef.nativeElement
      .children[0] as HTMLElement;
    this.elementSize = Math.min(
      sizeBaseNode.offsetHeight,
      sizeBaseNode.offsetWidth,
      740
    );
    if (this.scene) {
      this.scene.minSize = this.elementSize;
    }
  }

  onPlay(): void {
    if (this.sourceType !== AudioSource.None) {
      this.isPlaying = true;
      this.player.play();
    } else {
      this.noAudioSource.emit();
    }
  }

  onPause(): void {
    this.player.pause();
    this.isPlaying = false;
  }

  toggleSound(): void {
    if (this.isMuted) {
      this.player.unmute();
    } else {
      this.player.mute();
    }
    this.isMuted = !this.isMuted;
  }
}
