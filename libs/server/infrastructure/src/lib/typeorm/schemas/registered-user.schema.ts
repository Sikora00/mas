import { RegisteredUser, User } from '@mas/server/core/domain';
import { EntitySchema } from 'typeorm';

export const RegisteredUserSchema = new EntitySchema({
  target: RegisteredUser,
  name: 'RegisteredUser',
  tableName: 'user',
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
