import { Uuid } from '@mas/server/core/domain';
import { IQuery } from '@nestjs/cqrs';

export class GetRoomStreamQuery implements IQuery {
  constructor(public id: Uuid) {}
}
