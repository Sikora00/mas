import { QueuedSong } from "./queued-song";
import { Playlist } from "./playlist";
import { Identifiable } from "../interfaces/identifiable";
import { Uuid } from "../value-objects/uuid";
import { Genre } from "./genre";

export class Song implements Identifiable<Song> {
  private addedAt: Date;
  private audioFile: SongFile;
  private genre?: Genre;
  private id: string;
  private inPlaylists: Playlist[];
  private queued: QueuedSong[];
  private title: string;
  private videoFile: SongFile;

  private constructor() {
  }

  static create(title: string, genre?: Genre): Song {
    const instance = new Song();
    instance.addedAt = new Date();
    instance.genre = genre;
    instance.id = Uuid.random().toString();
    instance.inPlaylists = [];
    instance.queued = [];
    instance.title = title;
    instance.videoFile = SongFile.create('mp4', instance);
    instance.audioFile = SongFile.create(`mp3`, instance);
    return instance;
  }

  addedToQueue(queuedSong: QueuedSong): void {
    if (!this.queued.find(queuedItem => queuedItem.equals(queuedSong))) {
      this.queued.push(queuedSong);
    }
  }

  addToPlaylist(playlist: Playlist): void {
    if (!this.inPlaylists.find(p => p.equals(playlist))) {
      this.inPlaylists.push(playlist);
      playlist.addSong(this);
    }
  }

  equals(instance: Song): boolean {
    return this.getId().equals(instance.getId())
  }

  getId(): Uuid {
    return Uuid.fromString(this.id);
  }
}

class SongFile {
  private song: Song
  private path: string;

  static create(extension: string, song: Song): SongFile {
    const instance = new SongFile();
    instance.song = song;
    instance.path = `assets/songs/${song.getId()}.${extension}`;
    return instance;
  }
}
