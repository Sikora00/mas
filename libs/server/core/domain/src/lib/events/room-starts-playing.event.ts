import { Uuid } from '@mas/server/core/domain';

export class RoomStartsPlayingEvent {
  constructor(public roomId: Uuid) {}
}
