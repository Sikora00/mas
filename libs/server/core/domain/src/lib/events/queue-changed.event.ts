import { Uuid } from '@mas/server/core/domain';

export class QueueChangedEvent {
  constructor(public roomId: Uuid) {}
}
