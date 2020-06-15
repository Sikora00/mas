import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SelectExternalRadioCommand } from './select-external-radio.command'
import { ExternalRadioRepository, UserRepository } from "@mas/server/core/domain-services";


@CommandHandler(SelectExternalRadioCommand)
export class SelectExternalRadioHandler implements ICommandHandler<SelectExternalRadioCommand> {
  constructor(private userRepository: UserRepository, private externalRadioRepository: ExternalRadioRepository) {
  }

  async execute(command: SelectExternalRadioCommand): Promise<void> {
    const user = await this.userRepository.findByIdOrFail(command.userId);
    const externalRadio = await this.externalRadioRepository.findByIdOrFail(command.externalRadioId);
    user.selectExternalRadio(externalRadio);
    await this.userRepository.save(user)
  }
}
