import { Subject } from 'rxjs';

import { Framer } from './framer';
import { Scene } from './scene';
import { Room } from '../../models/room.model';
import { ExternalRadio } from '../../models/external-radio.model';

export class Player {
  get radio(): ExternalRadio | undefined {
    return this._radio;
  }

  set radio(value: ExternalRadio | undefined) {
    this._radio = value;
    this.handleSourceChange();
  }

  get src(): string {
    return this._src;
  }

  set src(value: string) {
    if (value !== this.src && value) {
      this._src = value;
      this.audio.src = value;
      this.audio.load();
      if (this.context.state === 'running') {
        this.audio.play();
      }
    }
  }

  get room(): Room {
    return this._room;
  }

  set room(value: Room) {
    this._room = value;
    this.handleSourceChange();
  }

  isLoadingChange$: Subject<boolean> = new Subject<boolean>();

  public audio: HTMLAudioElement;
  public context: AudioContext;

  private analyser: AnalyserNode;
  private destination: AudioDestinationNode;
  private gainNode: GainNode;
  private javascriptNode: ScriptProcessorNode;
  private source: MediaElementAudioSourceNode;
  private _radio?: ExternalRadio;
  private _src: string;
  private _room: Room;

  constructor(private scene: Scene, private framer: Framer) {}

  destroy(): void {
    this.audio.remove();
    this.isLoadingChange$.complete();
  }

  init(): void {
    (<any>window).AudioContext =
      (<any>window).AudioContext || (<any>window).webkitAudioContext;
    if (!AudioContext) {
      return;
    }
    this.context = new AudioContext();
    if (this.context.suspend) {
      this.context.suspend();
    }
    try {
      this.javascriptNode = this.context.createScriptProcessor(2048, 1, 1);
      this.javascriptNode.connect(this.context.destination);
      this.analyser = this.context.createAnalyser();
      this.analyser.connect(this.javascriptNode);
      this.analyser.smoothingTimeConstant = 0.6;
      this.analyser.fftSize = 2048;
      this.audio = <HTMLAudioElement>document.getElementById('playerHtmlAudio');
      this.audio.crossOrigin = 'anonymous';
      this.audio.addEventListener('ended', this.replayStream.bind(this));
      this.audio.addEventListener('error', this.replayStream.bind(this));
      this.source = this.context.createMediaElementSource(this.audio);
      this.destination = this.context.destination;

      this.gainNode = this.context.createGain();
      this.source.connect(this.gainNode);
      this.gainNode.connect(this.analyser);
      this.gainNode.connect(this.destination);

      this.initHandlers();
    } finally {
      this.framer.setLoadingPercent(1);
    }
    this.scene.init();
  }

  handleSourceChange(): void {
    let mainTitle = 'DJ PAWEŁ';
    let secondTitle = this.room?.name || this.radio?.name || '';

    document.querySelector('.song .artist').textContent = mainTitle;
    document.querySelector('.song .name').textContent = secondTitle;
    // this.currentSongIndex = index;
  }

  nextTrack(): void {
    // ++this.currentSongIndex;
    // if (this.currentSongIndex == this.tracks.length) {
    //     this.currentSongIndex = 0;
    // }
    // this.source.stop();
    // this.source = this.context.createBufferSource();
    // this.source.connect(this.gainNode);
    // this.loadTrack(this.currentSongIndex);
    // this.source.start();
  }

  prevTrack(): void {
    //   --this.currentSongIndex;
    //   if (this.currentSongIndex == -1) {
    //     this.currentSongIndex = this.tracks.length - 1;
    //   }
    //
    //   this.source.stop();
    //   this.source = this.context.createBufferSource();
    //   this.source.connect(this.gainNode);
    //   this.loadTrack(this.currentSongIndex);
    //   this.source.start();
  }

  //
  play(): void {
    if (this.context.resume) {
      this.context.resume();
    }
    this.audio.load();
    this.audio.play();
  }

  stop(): void {
    this.audio.pause();
    this.context.suspend();
  }

  pause(): void {
    if (this.context.suspend) {
      this.context.suspend();
    }
    this.audio.pause();
  }

  mute(): void {
    this.gainNode.gain.value = 0;
  }

  unmute(): void {
    this.gainNode.gain.value = 1;
  }

  initHandlers(): void {
    this.audio.addEventListener('ended', this.emitIsLoading.bind(this));
    this.audio.addEventListener('progress', this.emitIsNotLoading.bind(this));
    this.audio.addEventListener('waiting', this.emitIsLoading.bind(this));

    // ToDo onaudioprocess is deprecated
    // tslint:disable-next-line
    this.javascriptNode.onaudioprocess = () => {
      this.framer.frequencyData = new Uint8Array(
        this.analyser.frequencyBinCount
      );
      this.analyser.getByteFrequencyData(this.framer.frequencyData);
    };
  }

  private emitIsLoading(): void {
    this.isLoadingChange$.next(true);
  }

  private emitIsNotLoading(): void {
    this.isLoadingChange$.next(false);
  }

  private replayStream(): void {
    setTimeout(() => {
      this.audio.load();
      if (this.context.state === 'running') {
        this.audio.play().catch(() => {});
      }
    }, 1000);
  }
}
