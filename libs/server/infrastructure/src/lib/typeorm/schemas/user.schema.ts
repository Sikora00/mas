import { User } from '@mas/server/core/domain';
import { EntitySchema } from 'typeorm';

export const UserSchema = new EntitySchema<any>({
  target: User,
  name: 'User',
  columns: {
    id: {
      primary: true,
      type: String,
    },
  },
  relations: {
    queued: {
      lazy: true,
      type: 'one-to-many',
      target: 'QueuedSong',
      inverseSide: 'addedBy',
    },
    selectedRoom: {
      eager: true,
      type: 'many-to-one',
      target: 'Room',
      inverseSide: 'usersInChannel',
    },
    selectedExternalRadio: {
      eager: true,
      type: 'many-to-one',
      target: 'ExternalRadio',
      inverseSide: 'selectedBy',
    },
    vote: {
      lazy: true,
      type: 'one-to-many',
      target: 'Vote',
      inverseSide: 'by',
    },
  },
});
