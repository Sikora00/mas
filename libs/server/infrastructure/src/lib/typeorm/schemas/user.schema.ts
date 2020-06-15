import { EntitySchema } from 'typeorm';
import { User } from '@mas/server/core/domain';

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
    selectedRoom: {
      type: 'many-to-one',
      target: 'Room',
      inverseSide: 'usersInChannel',
    },
    selectedExternalRadio: {
      type: 'many-to-one',
      target: 'ExternalRadio',
      inverseSide: 'selectedBy'
    }
  },
});
