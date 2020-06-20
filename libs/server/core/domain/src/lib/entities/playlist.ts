import { Identifiable } from '../interfaces/identifiable';
import { Uuid } from '../value-objects/uuid';
import { Genre } from './genre';
import { Song } from './song';

export class Playlist implements Identifiable<Playlist> {
  private id: string;
  private genre?: Genre;
  private name: string;
  private songs: Promise<Song[]>;
  private nestedPlaylists: Playlist[];
  private containedIn: Promise<Playlist[]>;

  private constructor() {}

  static create(name: string): Playlist {
    const instance = new Playlist();
    instance.id = Uuid.random().toString();
    instance.name = name;
    return instance;
  }

  async addPlaylist(playlist: Playlist): Promise<void> {
    const containedIn = await playlist.containedIn;
    if (
      !this.nestedPlaylists.find((p) => p.equals(playlist)) &&
      !playlist.equals(this)
    ) {
      this.nestedPlaylists.push(playlist);
      containedIn.push(this);
    }
  }

  async addSong(song: Song): Promise<void> {
    const songs = await this.songs;
    if (!songs.find((s) => s.equals(song))) {
      songs.push(song);
      await song.addToPlaylist(this);
    }
  }

  equals(instance: Playlist): boolean {
    return this.getId().equals(instance.getId());
  }

  async getAllSongs(): Promise<Song[]> {
    let songs = await this.songs;
    for (const playlist of this.nestedPlaylists) {
      songs = songs.concat(await playlist.getAllSongs());
    }

    return songs;
  }

  getId(): Uuid {
    return Uuid.fromString(this.id);
  }
}
