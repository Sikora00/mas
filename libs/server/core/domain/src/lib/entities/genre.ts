import { MusicGenreType } from "../value-objects/music-genre-type";
import { Playlist } from "./playlist";
import { Song } from "./song";

export class Genre {
  private playlists: Playlist[];
  private songs: Song[];
  private type: Set<MusicGenreType>;
}
