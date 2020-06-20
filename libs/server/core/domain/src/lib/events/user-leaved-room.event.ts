import { Uuid } from '@mas/server/core/domain';

export class UserLeavedRoomEvent {
  constructor(public userId: Uuid, public roomId: Uuid) {}
}
