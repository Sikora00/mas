import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SelectExternalRadioCommand } from './commands/select-external-radio/select-external-radio.command';
import { CurrentUserReadModel } from './queries/get-current-user/current-user.read-model';
import { GetCurrentUserQuery } from './queries/get-current-user/get-current-user.query';

@Injectable()
export class UserService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  selectExternalRadio(command: SelectExternalRadioCommand): Promise<void> {
    return this.commandBus.execute(command);
  }

  getCurrentUser(query: GetCurrentUserQuery): Promise<CurrentUserReadModel> {
    return this.queryBus.execute(query);
  }
}
