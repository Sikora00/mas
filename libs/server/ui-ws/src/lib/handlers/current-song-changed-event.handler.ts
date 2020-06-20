import { QueuedSong } from '@mas/server/core/domain';
import { RoomRepository } from '@mas/server/core/domain-services';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrentSongChangedEvent } from '../../../../core/domain/src/lib/events/current-song-changed.event';
import { QueuedSongSchema } from '../../../../infrastructure/src/lib/typeorm/schemas/queued-song.schema';
import { MainGateway } from '../main.gateway';

@EventsHandler(CurrentSongChangedEvent)
export class CurrentSongChangedEventHandler
  implements IEventHandler<CurrentSongChangedEvent> {
  constructor(
    private gateway: MainGateway,
    private roomRepository: RoomRepository,
    @InjectRepository(QueuedSongSchema)
    private queuedSongRepository: Repository<QueuedSong>
  ) {}

  async handle(event: CurrentSongChangedEvent): Promise<void> {
    const room = await this.roomRepository.findByIdOrFail(event.roomId);
    const currentSongId = room.getCurrentSong()?.getId();
    let currentSong;
    if (currentSongId) {
      currentSong = (
        await this.queuedSongRepository.findOneOrFail(currentSongId.toString())
      ).getSong();
      currentSong = {
        title: currentSong.getTitle(),
        image: currentSong.getImage(),
      };
    }
    this.gateway.sendToUsersInRoom(room.getId(), 'currentSong', {
      currentSong,
    });
  }
}
