import {
  RoomRepository,
  UserRepository,
} from '@mas/server/core/domain-services';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { LeaveCommand } from './leave.command';

@CommandHandler(LeaveCommand)
export class LeaveHandler implements ICommandHandler<LeaveCommand> {
  constructor(
    private userRepository: UserRepository,
    private roomRepository: RoomRepository,
    private publisher: EventPublisher
  ) {}

  async execute(command: LeaveCommand): Promise<void> {
    const user = this.publisher.mergeObjectContext(
      await this.userRepository.findByIdOrFail(command.userId)
    );
    const room = this.publisher.mergeObjectContext(
      await this.roomRepository.findByIdOrFail(command.roomId)
    );

    await user.leave(room);
    await this.roomRepository.save(room);
    await this.userRepository.save(user);
    room.commit();
  }
}
