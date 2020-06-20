import { Pipe, PipeTransform } from '@angular/core';
import { AudioSource } from '../models/audio-source';
import { ExternalRadio } from '../models/external-radio.model';
import { Room } from '../models/room.model';
import { Song } from '../models/song.model';

@Pipe({
  name: 'audioSource',
})
export class AudioSourcePipe implements PipeTransform {
  transform(type: AudioSource, ...args: any): unknown {
    const [room, song, radio]: [
      Room | undefined,
      Song | undefined,
      ExternalRadio | undefined
    ] = args;
    switch (type) {
      case AudioSource.Radio:
        return radio?.name || '';
      case AudioSource.Room:
        return `${room?.name} - ${song?.title}` || '';
      default:
        return '';
    }
  }
}
