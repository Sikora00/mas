import { Room, User } from '@mas/server/core/domain';
import { EntitySchema } from 'typeorm';

export const RoomSchema = new EntitySchema<any>({
  target: Room,
  name: 'Room',
  columns: {
    address: {
      type: String,
    },
    id: {
      primary: true,
      type: String,
    },
    name: {
      type: String,
    },
  },
  relations: {
    currentSong: {
      eager: true,
      type: 'one-to-one',
      target: 'QueuedSong',
      joinColumn: true,
    },
    moderators: {
      lazy: true,
      type: 'many-to-many',
      target: 'Moderator',
      joinTable: true,
    },
    queue: {
      persistence: true,
      cascade: true,
      lazy: true,
      type: 'one-to-many',
      target: 'QueuedSong',
      inverseSide: 'room',
    },
    savedFor: {
      lazy: true,
      type: 'many-to-many',
      joinTable: {
        joinColumn: { name: 'id' },
        inverseJoinColumn: { name: 'id' },
      },
      target: 'RegisteredUser',
      inverseSide: 'savedRooms',
    },
    usersInRoom: {
      lazy: true,
      type: 'one-to-many',
      target: 'User',
      inverseSide: 'selectedRoom',
    },
  },
});
