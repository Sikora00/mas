import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserJoinedRoomEvent } from '../../../../core/domain/src/lib/events/user-joined-room.event';
import { MainGateway } from '../main.gateway';

@EventsHandler(UserJoinedRoomEvent)
export class UserJoinedRoomEventHandler
  implements IEventHandler<UserJoinedRoomEvent> {
  constructor(private gateway: MainGateway) {}

  async handle(event: UserJoinedRoomEvent): Promise<void> {
    this.gateway.addUserToRoom(event.userId, event.roomId);
  }
}
