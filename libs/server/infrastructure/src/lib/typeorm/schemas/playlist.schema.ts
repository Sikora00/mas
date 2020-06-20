import { EntitySchema } from 'typeorm';
import { Genre } from '../../../../../core/domain/src/lib/entities/genre';
import { Playlist } from '../../../../../core/domain/src/lib/entities/playlist';

export const PlaylistSchema = new EntitySchema<any>({
  target: Playlist,
  name: 'Playlist',
  columns: {
    id: {
      primary: true,
      type: String,
    },
    name: { type: String },
  },
  relations: {
    genre: {
      eager: true,
      type: 'many-to-one',
      target: 'Genre',
      inverseSide: 'playlists',
    },
    songs: {
      lazy: true,
      type: 'many-to-many',
      target: 'Song',
      inverseSide: 'inPlaylists',
    },
    nestedPlaylists: {
      eager: true,
      type: 'many-to-many',
      target: 'Playlist',
      inverseSide: 'containedIn',
    },
    containedIn: {
      lazy: true,
      type: 'many-to-many',
      target: 'Playlist',
      inverseSide: 'nestedPlaylists',
      joinTable: true,
    },
  },
});
