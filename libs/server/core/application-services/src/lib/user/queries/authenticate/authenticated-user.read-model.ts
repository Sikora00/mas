import { Uuid } from '@mas/server/core/domain';

export class AuthenticatedUserReadModel {
  constructor(public id: Uuid) {}
}
