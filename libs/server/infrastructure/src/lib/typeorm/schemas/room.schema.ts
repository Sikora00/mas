import { EntitySchema } from 'typeorm';
import { Room, User } from '@mas/server/core/domain';

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
    savedFor: {
      eager: true,
      type: 'many-to-many',
      joinTable: {
        joinColumn: { name: 'id' },
        inverseJoinColumn: { name: 'id' },
      },
      target: 'RegisteredUser',
      inverseSide: 'savedRooms',
    },
    usersInRoom: {
      eager: true,
      type: 'one-to-many',
      target: 'User',
      inverseSide: 'selectedRoom',
    },
  },
});
