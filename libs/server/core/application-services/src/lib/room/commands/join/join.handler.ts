import {
  RoomRepository,
  UserRepository,
} from '@mas/server/core/domain-services';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JoinCommand } from './join.command';

@CommandHandler(JoinCommand)
export class JoinHandler implements ICommandHandler<JoinCommand> {
  constructor(
    private userRepository: UserRepository,
    private roomRepository: RoomRepository
  ) {}

  async execute(command: JoinCommand): Promise<void> {
    const user = await this.userRepository.findByIdOrFail(command.userId);
    const room = await this.roomRepository.findByIdOrFail(command.roomId);

    room.join(user);
    await this.roomRepository.save(room);
    await this.userRepository.save(user);
  }
}
