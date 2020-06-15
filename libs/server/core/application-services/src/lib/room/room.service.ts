import { Injectable } from '@nestjs/common';
import { Uuid } from '@mas/server/core/domain';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserRoomsReadModel } from './queries/get-user-rooms/get-user-rooms.read-model';
import { GetUserRoomsQuery } from './queries/get-user-rooms/get-user-rooms.query';
import { JoinCommand } from './commands/join/join.command';

@Injectable()
export class RoomService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  getRoomsForUser(query: GetUserRoomsQuery): Promise<GetUserRoomsReadModel[]> {
    return this.queryBus.execute(query);
  }

  join(command: JoinCommand): Promise<void> {
    return this.commandBus.execute(command);
  }
}
