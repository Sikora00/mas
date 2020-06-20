import { Uuid } from '@mas/server/core/domain';
import { Identifiable } from '../interfaces/identifiable';
import { MusicGenreType } from '../value-objects/music-genre-type';
import { Playlist } from './playlist';
import { Song } from './song';

export class Genre implements Identifiable<Genre> {
  private id: string;
  private playlists: Playlist[];
  private songs: Promise<Song[]>;
  private types: Set<MusicGenreType>;
  private name: string;

  private constructor() {}

  static create(name: string, types: Set<MusicGenreType>): Genre {
    const instance = new Genre();
    instance.id = Uuid.random().toString();
    instance.name = name;
    instance.types = types;
    return instance;
  }

  equals(instance: Genre): boolean {
    return this.getId().equals(instance.getId());
  }

  getId(): Uuid {
    return Uuid.fromString(this.id);
  }

  async addSong(song: Song): Promise<void> {
    const songs = await this.songs;
    if (!songs.find((s) => s.equals(song))) {
      songs.push(song);
      await song.setGenre(this);
    }
  }
}
