import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  GetUserRoomsQuery,
  GetUserRoomsReadModel,
  RoomService,
} from '@mas/server/core/application-services';
import { CurrentUser } from '../request-decorators/current-user.request-decorator';
import { Uuid } from '@mas/server/core/domain';
import { AuthGuard } from '../guards/auth.guard';
import { AuthenticatedUserReadModel } from '../../../../core/application-services/src/lib/user/queries/authenticate/authenticated-user.read-model';
import { JoinCommand } from '../../../../core/application-services/src/lib/room/commands/join/join.command';

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
}
