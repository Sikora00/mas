import { QueuedSong, Room, Song, User } from '@mas/server/core/domain';
import { EntitySchema } from 'typeorm';
import { Vote } from '../../../../../core/domain/src/lib/entities/vote';

export const QueuedSongSchema = new EntitySchema<any>({
  target: QueuedSong,
  name: 'QueuedSong',
  columns: {
    id: {
      primary: true,
      type: String,
    },
    playedAt: {
      type: Date,
      nullable: true,
    },
  },
  relations: {
    addedBy: {
      lazy: true,
      type: 'many-to-one',
      target: 'User',
      inverseSide: 'queued',
      nullable: true,
    },
    room: {
      lazy: true,
      type: 'many-to-one',
      target: 'Room',
      inverseSide: 'queue',
    },
    song: {
      eager: true,
      type: 'many-to-one',
      target: 'Song',
      inverseSide: 'queued',
    },
    votes: {
      cascade: true,
      lazy: true,
      type: 'one-to-many',
      target: 'Vote',
      inverseSide: 'song',
    },
  },
});
