import {
  RoomRepository,
  SongRepository,
  UserRepository,
} from '@mas/server/core/domain-services';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { QueueSongCommand } from './queue-song.command';

@CommandHandler(QueueSongCommand)
export class QueueSongHandler implements ICommandHandler<QueueSongCommand> {
  constructor(
    private roomRepository: RoomRepository,
    private songRepository: SongRepository,
    private userRepository: UserRepository,
    private publisher: EventPublisher
  ) {}

  async execute(command: QueueSongCommand): Promise<void> {
    const room = this.publisher.mergeObjectContext(
      await this.roomRepository.findByIdOrFail(command.roomId)
    );
    const song = await this.songRepository.findByIdOrFail(command.songId);
    const user = await this.userRepository.findByIdOrFail(command.userId);
    await room.addToQueue(song, user);
    await this.roomRepository.save(room);
    room.commit();
  }
}
