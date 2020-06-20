import { Identifiable } from '../interfaces/identifiable';
import { Uuid } from '../value-objects/uuid';
import { Genre } from './genre';
import { Playlist } from './playlist';
import { QueuedSong } from './queued-song';

export class Song implements Identifiable<Song> {
  private addedAt: Date;
  private audioFile: SongFile;
  private genre?: Genre;
  private id: string;
  private inPlaylists: Promise<Playlist[]>;
  private image: string;
  private queued: Promise<QueuedSong[]>;
  private title: string;
  private videoFile: SongFile;

  private constructor() {
    this.videoFile = SongFile.create('mp4', this);
    this.audioFile = SongFile.create(`mp3`, this);
  }

  static create(id: Uuid, title: string, image: URL, genre?: Genre): Song {
    const instance = new Song();
    instance.addedAt = new Date();
    instance.genre = genre;
    instance.id = id.toString();
    instance.inPlaylists = Promise.resolve([]);
    instance.image = image.toString();
    instance.queued = Promise.resolve([]);
    instance.title = title;
    return instance;
  }

  async addedToQueue(queuedSong: QueuedSong): Promise<void> {
    const queued = await this.queued;
    if (!queued.find((queuedItem) => queuedItem.equals(queuedSong))) {
      queued.push(queuedSong);
    }
  }

  async addToPlaylist(playlist: Playlist): Promise<void> {
    const inPlaylists = await this.inPlaylists;
    if (!inPlaylists.find((p) => p.equals(playlist))) {
      inPlaylists.push(playlist);
      await playlist.addSong(this);
    }
  }

  equals(instance: Song): boolean {
    return this.getId().equals(instance.getId());
  }

  getAudioFilePath(): string {
    return this.audioFile.getPath();
  }

  getId(): Uuid {
    return Uuid.fromString(this.id);
  }

  getTitle(): string {
    return this.title;
  }

  getImage(): URL {
    return new URL(this.image);
  }

  async setGenre(genre: Genre): Promise<void> {
    if (!this.genre?.equals(genre)) {
      this.genre = genre;
      await genre.addSong(this);
    }
  }
}

class SongFile {
  private song: Song;
  private extension: string;

  static create(extension: string, song: Song): SongFile {
    const instance = new SongFile();
    instance.song = song;
    instance.extension = extension;
    return instance;
  }

  getDuration(): number {
    return 0;
  }

  getPath(): string {
    return `assets/songs/${this.song.getId()}.${this.extension}`;
  }
}
