import {
  AuthenticatedUserReadModel,
  GetRoomStreamQuery,
  GetUserRoomsQuery,
  GetUserRoomsReadModel,
  JoinCommand,
  RoomService,
} from '@mas/server/core/application-services';
import { Uuid } from '@mas/server/core/domain';
import { Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../request-decorators/current-user.request-decorator';
import { ResponseStreamerService } from '../services/response-streamer.service';

@Controller('room')
@UseGuards(AuthGuard)
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get(':id')
  getUserRooms(
    @CurrentUser() user: AuthenticatedUserReadModel,
    @Param('id') id: string
  ): Promise<GetUserRoomsReadModel[]> {
    return this.roomService.getRoomsForUser(
      new GetUserRoomsQuery(user.id, Uuid.fromString(id))
    );
  }

  @Post(':id/user')
  join(
    @CurrentUser() user: AuthenticatedUserReadModel,
    @Param('id') id: string
  ): Promise<void> {
    return this.roomService.join(new JoinCommand(user.id, Uuid.fromString(id)));
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
}
