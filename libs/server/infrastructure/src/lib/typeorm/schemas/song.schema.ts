import { Song } from '@mas/server/core/domain';
import { EntitySchema } from 'typeorm';

export const SongSchema = new EntitySchema<any>({
  target: Song,
  name: 'Song',
  columns: {
    id: {
      primary: true,
      type: String,
    },
    image: {
      type: String,
    },
    title: {
      type: String,
    },
  },
  relations: {
    genre: {
      eager: true,
      type: 'many-to-one',
      target: 'Genre',
      inverseSide: 'songs',
    },
    queued: {
      lazy: true,
      type: 'one-to-many',
      target: 'QueuedSong',
      inverseSide: 'song',
    },
    inPlaylists: {
      lazy: true,
      type: 'many-to-many',
      target: 'Playlist',
      inverseSide: 'songs',
      joinTable: true,
    },
  },
});
