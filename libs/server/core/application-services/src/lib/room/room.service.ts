import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JoinCommand } from './commands/join/join.command';
import { LeaveCommand } from './commands/leave/leave.command';
import { QueueSongCommand } from './commands/queue-song/queue-song.command';
import { GetRoomStreamQuery } from './queries/get-room-stream/get-room-stream.query';
import { GetRoomStreamReadModel } from './queries/get-room-stream/get-room-stream.read-model';
import { GetRoomQuery } from './queries/get-room/get-room.query';
import { GetRoomReadModel } from './queries/get-room/get-room.read-model';
import { GetUserRoomsQuery } from './queries/get-user-rooms/get-user-rooms.query';
import { GetUserRoomsReadModel } from './queries/get-user-rooms/get-user-rooms.read-model';

@Injectable()
export class RoomService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  getRoom(query: GetRoomQuery): Promise<GetRoomReadModel> {
    return this.queryBus.execute(query);
  }

  getRoomsForUser(query: GetUserRoomsQuery): Promise<GetUserRoomsReadModel[]> {
    return this.queryBus.execute(query);
  }

  getRoomStream(query: GetRoomStreamQuery): Promise<GetRoomStreamReadModel> {
    return this.queryBus.execute(query);
  }

  join(command: JoinCommand): Promise<void> {
    return this.commandBus.execute(command);
  }

  leave(command: LeaveCommand): Promise<void> {
    return this.commandBus.execute(command);
  }

  queueSong(command: QueueSongCommand): Promise<void> {
    return this.commandBus.execute(command);
  }
}
