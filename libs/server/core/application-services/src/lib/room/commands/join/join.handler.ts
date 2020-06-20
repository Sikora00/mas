import {
  RoomRepository,
  UserRepository,
} from '@mas/server/core/domain-services';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { JoinCommand } from './join.command';

@CommandHandler(JoinCommand)
export class JoinHandler implements ICommandHandler<JoinCommand> {
  constructor(
    private userRepository: UserRepository,
    private roomRepository: RoomRepository,
    private publisher: EventPublisher
  ) {}

  async execute(command: JoinCommand): Promise<void> {
    const user = this.publisher.mergeObjectContext(
      await this.userRepository.findByIdOrFail(command.userId)
    );
    const room = this.publisher.mergeObjectContext(
      await this.roomRepository.findByIdOrFail(command.roomId)
    );

    await room.join(user);
    await this.roomRepository.save(room);
    await this.userRepository.save(user);
    user.commit();
    room.commit();
  }
}
