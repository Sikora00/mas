import { QueuedSong } from '@mas/server/core/domain';
import { RoomRepository } from '@mas/server/core/domain-services';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueuedSongSchema } from '../../../../../../../infrastructure/src/lib/typeorm/schemas/queued-song.schema';
import { GetRoomQuery } from './get-room.query';
import { GetRoomReadModel } from './get-room.read-model';

@QueryHandler(GetRoomQuery)
export class GetRoomHandler implements IQueryHandler<GetRoomQuery> {
  constructor(
    private roomRepository: RoomRepository,
    @InjectRepository(QueuedSongSchema)
    private queuedSongRepository: Repository<QueuedSong>
  ) {}

  async execute(query: GetRoomQuery): Promise<GetRoomReadModel> {
    const room = await this.roomRepository.findByIdOrFail(query.roomId);
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
        image: song.getImage().toString(),
      }));
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
    return new GetRoomReadModel(
      room.getId().toString(),
      room.getName(),
      currentSong,
      queue
    );
  }
}
