import { ICommand } from '@nestjs/cqrs';
import { Uuid } from "@mas/server/core/domain";

export class SelectExternalRadioCommand implements ICommand {
  constructor(public userId: Uuid, public externalRadioId: Uuid) {}
}
