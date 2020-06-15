import { EntitySchema } from 'typeorm';
import { ExternalRadio, User } from '@mas/server/core/domain';

export const ExternalRadioSchema = new EntitySchema<any>({
  target: ExternalRadio,
  name: 'ExternalRadio',
  columns: {
    address: {
      type: String,
    },
    id: {
      primary: true,
      type: String,
    },
    logo: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  relations: {
    selectedBy: {lazy: true, target: 'User', type: 'many-to-one', inverseSide: 'selectedExternalRadio'}
  }
});
