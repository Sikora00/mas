import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JoinCommand } from './commands/join/join.command';
import { GetRoomStreamQuery } from './queries/get-room-stream/get-room-stream.query';
import { GetRoomStreamReadModel } from './queries/get-room-stream/get-room-stream.read-model';
import { GetUserRoomsQuery } from './queries/get-user-rooms/get-user-rooms.query';
import { GetUserRoomsReadModel } from './queries/get-user-rooms/get-user-rooms.read-model';

@Injectable()
export class RoomService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  getRoomsForUser(query: GetUserRoomsQuery): Promise<GetUserRoomsReadModel[]> {
    return this.queryBus.execute(query);
  }

  getRoomStream(query: GetRoomStreamQuery): Promise<GetRoomStreamReadModel> {
    return this.queryBus.execute(query);
  }

  join(command: JoinCommand): Promise<void> {
    return this.commandBus.execute(command);
  }
}
