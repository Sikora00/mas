import { Uuid } from '@mas/server/core/domain';
import { ICommand } from '@nestjs/cqrs';

export class JoinCommand implements ICommand {
  constructor(public userId: Uuid, public roomId: Uuid) {}
}
