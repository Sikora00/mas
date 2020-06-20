import { Uuid } from '@mas/server/core/domain';
import { ICommand } from '@nestjs/cqrs';

export class QueueSongCommand implements ICommand {
  constructor(public roomId: Uuid, public songId: Uuid, public userId: Uuid) {}
}
