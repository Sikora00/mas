import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { of } from 'rxjs';
import { delay, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ExternalRadio } from '../../models/external-radio.model';
import { Room } from '../../models/room.model';
import { Controls } from './controls';
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
  get src(): string {
    return this._src;
  }

  @Input()
  set externalRadio(value: ExternalRadio | null) {
    if (this.player) {
      this.player.radio = value;
    }
  }

  @Input()
  set src(value: string) {
    this._src = value;
    if (this.player) {
      this.player.src = value;
    }
  }

  get room(): Room {
    return this._room;
  }

  @Input()
  set room(value: Room) {
    this._room = value;
    if (this.player) {
      this.player.room = this.room;
    }
  }

  elementSize: number;
  isPlayerLoading$ = of(false);

  public player: Player;
  private framer: Framer;
  private scene: Scene;

  private _src: string;
  private _room: Room;

  @HostListener('window:resize')
  onResize(): void {
    this.setElementSize();
  }

  constructor(private elementRef: ElementRef<HTMLElement>) {}

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
    const controls = new Controls();

    this.scene = new Scene(this.framer, tracker, controls);
    this.setElementSize();
    this.player = new Player(this.scene, this.framer);
    if (this.room) {
      this.player.room = this.room;
    }

    controls.player = this.player;
    controls.scene = this.scene;
    controls.tracker = tracker;

    tracker.player = this.player;

    this.player.init();
    this.player.src = this.src;
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
}
