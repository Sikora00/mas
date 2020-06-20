import { QueuedSong } from '@mas/server/core/domain';
import { RoomRepository } from '@mas/server/core/domain-services';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueueChangedEvent } from '../../../../core/domain/src/lib/events/queue-changed.event';
import { QueuedSongSchema } from '../../../../infrastructure/src/lib/typeorm/schemas/queued-song.schema';
import { MainGateway } from '../main.gateway';

@EventsHandler(QueueChangedEvent)
export class QueueChangedEventHandler
  implements IEventHandler<QueueChangedEvent> {
  constructor(
    private gateway: MainGateway,
    private roomRepository: RoomRepository,
    @InjectRepository(QueuedSongSchema)
    private queuedSongRepository: Repository<QueuedSong>
  ) {}

  async handle(event: QueueChangedEvent): Promise<void> {
    const room = await this.roomRepository.findByIdOrFail(event.roomId);
    const queue = (
      await Promise.all(
        (await room.getQueue()).map((queuedSong) =>
          this.queuedSongRepository.findOneOrFail(queuedSong.getId().toString())
        )
      )
    )
      .map((queuedSong) => queuedSong.getSong())
      .map((song) => ({
        title: song.getTitle(),
        image: song.getImage(),
      }));
    this.gateway.sendToUsersInRoom(room.getId(), 'queue', { queue });
  }
}
