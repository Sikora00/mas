import { RegisteredUser, User } from '@mas/server/core/domain';
import { EntitySchema } from 'typeorm';

export const RegisteredUserSchema = new EntitySchema<any>({
  target: RegisteredUser,
  name: 'RegisteredUser',
  tableName: 'user',
  extends: 'User',
  columns: {
    login: {
      type: String,
      nullable: true,
    },
    password: {
      type: String,
      nullable: true,
    },
    previousPasswords: {
      type: 'simple-array',
      nullable: true,
    },
  },
  relations: {
    savedRooms: {
      lazy: true,
      type: 'many-to-many',
      target: 'Room',
      inverseSide: 'savedFor',
    },
  },
});
