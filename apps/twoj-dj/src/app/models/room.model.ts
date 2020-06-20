import { Song } from './song.model';

export interface Room {
  currentSong: Song;
  id: string;
  name: string;
  queue: Song[];
}
