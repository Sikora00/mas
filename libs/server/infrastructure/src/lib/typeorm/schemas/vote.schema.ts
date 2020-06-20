import { QueuedSong, RegisteredUser } from '@mas/server/core/domain';
import { EntitySchema } from 'typeorm';
import { Vote } from '../../../../../core/domain/src/lib/entities/vote';

export const VoteSchema = new EntitySchema<any>({
  target: Vote,
  name: 'Vote',
  columns: {
    id: {
      primary: true,
      type: String,
    },
    value: {
      type: Number,
    },
  },
  relations: {
    by: {
      eager: true,
      type: 'many-to-one',
      target: 'RegisteredUser',
      inverseSide: 'votes',
      joinColumn: true,
    },
    song: {
      eager: true,
      type: 'many-to-one',
      target: 'QueuedSong',
      inverseSide: 'votes',
    },
  },
});
