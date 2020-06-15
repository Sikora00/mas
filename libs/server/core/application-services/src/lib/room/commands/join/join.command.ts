import { ICommand } from '@nestjs/cqrs';
import { Uuid } from '@mas/server/core/domain';

export class JoinCommand implements ICommand {
  constructor(public userId: Uuid, public roomId: Uuid) {}
}
