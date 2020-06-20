import { EntitySchema } from 'typeorm';
import { Guest } from '../../../../../core/domain/src/lib/entities/guest';

export const GuestSchema = new EntitySchema<any>({
  target: Guest,
  name: 'Guest',
  tableName: 'user',
  extends: 'User',
  columns: {},
  relations: {},
});
