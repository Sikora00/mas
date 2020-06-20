import { Uuid } from '@mas/server/core/domain';
import { IQuery } from '@nestjs/cqrs';

export class GetRoomQuery implements IQuery {
  constructor(public roomId: Uuid) {}
}
