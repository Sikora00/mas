import { Pipe, PipeTransform } from '@angular/core';
import { AudioSource } from '../models/audio-source';
import { ExternalRadio } from '../models/external-radio.model';
import { Room } from '../models/room.model';
import { Song } from '../models/song.model';

@Pipe({
  name: 'audioSource',
})
export class AudioSourcePipe implements PipeTransform {
  transform(type: AudioSource, ...args: any[]): unknown {
    switch (type) {
      case AudioSource.Radio:
        return args[1]?.name || '';
      case AudioSource.Room:
        return `${args[0]?.title}` || '';
      default:
        return '';
    }
  }
}
