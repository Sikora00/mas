import { Uuid } from '@mas/server/core/domain';
import { IQuery } from '@nestjs/cqrs';

export class GetUserRoomsQuery implements IQuery {
  constructor(public userId: Uuid, public roomId?: Uuid) {}
}
