import { Uuid } from '@mas/server/core/domain';
import { IQuery } from '@nestjs/cqrs';

export class GetCurrentUserQuery implements IQuery {
  constructor(public userId: Uuid) {}
}
