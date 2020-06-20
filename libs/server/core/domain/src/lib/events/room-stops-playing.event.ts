import { Uuid } from '@mas/server/core/domain';

export class RoomStopsPlayingEvent {
  constructor(public roomId: Uuid) {}
}
