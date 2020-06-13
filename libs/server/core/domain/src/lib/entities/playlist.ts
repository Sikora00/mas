import { Song } from "./song";
import { Identifiable } from "../interfaces/identifiable";
import { Uuid } from "../value-objects/uuid";
import { Genre } from "./genre";

export class Playlist implements Identifiable<Playlist> {
  private id: string;
  private genre?: Genre;
  private name: string
  private songs: Song[];
  private nestedPlaylists: Playlist[];
  private containedIn: Playlist[];

  addPlaylist(playlist: Playlist): void {
    if(!this.nestedPlaylists.find(p => p.equals(playlist)) && !playlist.equals(this)) {
      this.nestedPlaylists.push(playlist)
      playlist.containedIn.push(this);
    }
  }

  addSong(song: Song): void {
    if (!this.songs.find(s => s.equals(song))) {
      this.songs.push(song);
      song.addToPlaylist(this)
    }
  }

  equals(instance: Playlist): boolean {
    return this.getId().equals(instance.getId())
  }

  getAllSongs(): Song[] {
    let songs = this.songs;
    this.nestedPlaylists.forEach(playlist => {
      songs = songs.concat(playlist.getAllSongs());
    })

    return songs;
  }

  getId(): Uuid {
    return Uuid.fromString(this.id)
  }
}
