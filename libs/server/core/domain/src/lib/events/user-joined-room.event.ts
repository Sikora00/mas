import { Uuid } from '@mas/server/core/domain';

export class UserJoinedRoomEvent {
  constructor(public userId: Uuid, public roomId: Uuid) {}
}
