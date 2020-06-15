import { IQuery } from '@nestjs/cqrs';
import { Uuid } from '@mas/server/core/domain';

export class GetUserRoomsQuery implements IQuery {
  constructor(public userId: Uuid, public roomId: Uuid) {}
}
