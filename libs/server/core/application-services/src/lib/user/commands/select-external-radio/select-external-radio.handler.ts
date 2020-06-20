import {
  ExternalRadioRepository,
  UserRepository,
} from '@mas/server/core/domain-services';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SelectExternalRadioCommand } from './select-external-radio.command';

@CommandHandler(SelectExternalRadioCommand)
export class SelectExternalRadioHandler
  implements ICommandHandler<SelectExternalRadioCommand> {
  constructor(
    private userRepository: UserRepository,
    private externalRadioRepository: ExternalRadioRepository,
    private publisher: EventPublisher
  ) {}

  async execute(command: SelectExternalRadioCommand): Promise<void> {
    const user = this.publisher.mergeObjectContext(
      await this.userRepository.findByIdOrFail(command.userId)
    );
    const externalRadio = await this.externalRadioRepository.findByIdOrFail(
      command.externalRadioId
    );
    await user.selectExternalRadio(externalRadio);
    await this.userRepository.save(user);
    user.commit();
  }
}
