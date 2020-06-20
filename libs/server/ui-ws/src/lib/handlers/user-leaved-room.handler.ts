import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserLeavedRoomEvent } from '../../../../core/domain/src/lib/events/user-leaved-room.event';
import { MainGateway } from '../main.gateway';

@EventsHandler(UserLeavedRoomEvent)
export class UserLeavedRoomEventHandler
  implements IEventHandler<UserLeavedRoomEvent> {
  constructor(private gateway: MainGateway) {}

  async handle(event: UserLeavedRoomEvent): Promise<void> {
    this.gateway.removeUserFromRoom(event.userId, event.roomId);
  }
}
