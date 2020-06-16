import { Uuid } from '@mas/server/core/domain';
import { ICommand } from '@nestjs/cqrs';

export class SelectExternalRadioCommand implements ICommand {
  constructor(public userId: Uuid, public externalRadioId: Uuid) {}
}
