import { Uuid } from '@mas/server/core/domain';

export class UserChangedPotentialMusicSourceEvent {
  constructor(public userId: Uuid) {}
}
