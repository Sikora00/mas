import { Song, Uuid } from '@mas/server/core/domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Command } from 'nestjs-command';
import { Repository } from 'typeorm';
import { RegisteredUserRepositoryAdapter } from '../../../../../libs/server/infrastructure/src/lib/typeorm/repositories/registered-user-repository.adapter';
import { RoomRepositoryAdapter } from '../../../../../libs/server/infrastructure/src/lib/typeorm/repositories/room-repository.adapter';
import { SongSchema } from '../../../../../libs/server/infrastructure/src/lib/typeorm/schemas/song.schema';

@Injectable()
export class PlaySongCommand {
  constructor(
    private registeredUserRepository: RegisteredUserRepositoryAdapter,
    private roomRepository: RoomRepositoryAdapter,
    @InjectRepository(SongSchema) private songRepository: Repository<Song>
  ) {}

  @Command({
    command: 'song:queue',
    describe: 'Add sample song to queue',
    autoExit: true,
  })
  async exec(): Promise<void> {
    const user = await this.registeredUserRepository.findByIdOrFail(
      Uuid.fromString('CBA99AC3-97AF-4906-A120-6BEF5B41674E')
    );

    const fobSong = await this.songRepository.findOneOrFail(
      Uuid.fromString('cb096865-51e3-4b3e-b6fb-065d4fc5ea3f').toString()
    );
    const room = await this.roomRepository.findByIdOrFail(
      Uuid.fromString('9f7cad36-b722-4ebf-8345-cf7181659918')
    );
    await room.addToQueue(fobSong, user);
    await this.roomRepository.save(room);
  }
}
