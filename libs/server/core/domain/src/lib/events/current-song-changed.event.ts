import { Uuid } from '@mas/server/core/domain';

export class CurrentSongChangedEvent {
  constructor(public roomId: Uuid) {}
}
