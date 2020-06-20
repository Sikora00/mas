import {
  AuthenticatedUserReadModel,
  GetRoomStreamQuery,
  GetUserRoomsQuery,
  GetUserRoomsReadModel,
  JoinCommand,
  RoomService,
} from '@mas/server/core/application-services';
import { Uuid } from '@mas/server/core/domain';
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { LeaveCommand } from '../../../../core/application-services/src/lib/room/commands/leave/leave.command';
import { QueueSongCommand } from '../../../../core/application-services/src/lib/room/commands/queue-song/queue-song.command';
import { GetRoomQuery } from '../../../../core/application-services/src/lib/room/queries/get-room/get-room.query';
import { GetRoomReadModel } from '../../../../core/application-services/src/lib/room/queries/get-room/get-room.read-model';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../request-decorators/current-user.request-decorator';
import { ResponseStreamerService } from '../services/response-streamer.service';

@Controller('room')
@UseGuards(AuthGuard)
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get()
  getUserRooms(
    @CurrentUser() user: AuthenticatedUserReadModel,
    @Query('id') id: string
  ): Promise<GetUserRoomsReadModel[]> {
    return this.roomService.getRoomsForUser(
      new GetUserRoomsQuery(user.id, id ? Uuid.fromString(id) : undefined)
    );
  }

  @Get(':id')
  getRoom(@Param('id') id: string): Promise<GetRoomReadModel> {
    return this.roomService.getRoom(new GetRoomQuery(Uuid.fromString(id)));
  }

  @Post(':id/user')
  join(
    @CurrentUser() user: AuthenticatedUserReadModel,
    @Param('id') id: string
  ): Promise<void> {
    return this.roomService.join(new JoinCommand(user.id, Uuid.fromString(id)));
  }

  @Delete(':id/user')
  leave(
    @CurrentUser() user: AuthenticatedUserReadModel,
    @Param('id') id: string
  ): Promise<void> {
    console.log('leave');
    return this.roomService.leave(
      new LeaveCommand(user.id, Uuid.fromString(id))
    );
  }

  @Get(':id/stream')
  async stream(
    @Res() response: Response,
    @Param('id') id: string
  ): Promise<void> {
    const streamResource = await this.roomService.getRoomStream(
      new GetRoomStreamQuery(Uuid.fromString(id))
    );
    const responseStreamer = new ResponseStreamerService(response);
    responseStreamer.stream(streamResource.stream);
  }

  @Post(':roomId/song/:songId')
  queueSong(
    @CurrentUser() user: AuthenticatedUserReadModel,
    @Param('roomId') roomId: string,
    @Param('songId') songId: string
  ): Promise<void> {
    return this.roomService.queueSong(
      new QueueSongCommand(
        Uuid.fromString(roomId),
        Uuid.fromString(songId),
        user.id
      )
    );
  }
}
