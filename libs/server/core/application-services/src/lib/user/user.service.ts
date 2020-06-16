import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SelectExternalRadioCommand } from './commands/select-external-radio/select-external-radio.command';

@Injectable()
export class UserService {
  constructor(private commandBus: CommandBus) {}

  selectExternalRadio(command: SelectExternalRadioCommand): Promise<void> {
    return this.commandBus.execute(command);
  }
}
