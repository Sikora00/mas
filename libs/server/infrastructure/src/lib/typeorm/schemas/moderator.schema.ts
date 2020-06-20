import { EntitySchema } from 'typeorm';
import { Moderator } from '../../../../../core/domain/src/lib/entities/moderator';

export const ModeratorSchema = new EntitySchema<any>({
  target: Moderator,
  name: 'Moderator',
  tableName: 'user',
  extends: 'RegisteredUser',
  columns: {},
  relations: {
    moderates: {
      lazy: true,
      type: 'many-to-many',
      target: 'Room',
      inverseSide: 'moderators',
    },
  },
});
