import { Uuid } from '@mas/server/core/domain';
import { ICommand } from '@nestjs/cqrs';

export class LeaveCommand implements ICommand {
  constructor(public roomId: Uuid, public userId: Uuid) {}
}
