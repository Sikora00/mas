import { EntitySchema } from 'typeorm';
import { RegisteredUser, User } from '@mas/server/core/domain';

export const RegisteredUserSchema = new EntitySchema({
  target: RegisteredUser,
  name: 'RegisteredUser',
  extends: 'User',
  columns: {},
  relations: {
    savedRooms: {
      lazy: true,
      type: 'many-to-many',
      target: 'Room',
      inverseSide: 'savedFor',
    },
  },
});
