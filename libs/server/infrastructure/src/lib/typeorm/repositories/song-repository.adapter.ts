import { Song, Uuid } from '@mas/server/core/domain';
import { SongRepository } from '@mas/server/core/domain-services';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SongSchema } from '../schemas/song.schema';

@Injectable()
export class SongRepositoryAdapter implements SongRepository {
  constructor(
    @InjectRepository(SongSchema)
    private typeOrmRepository: Repository<Song>
  ) {}

  findAll(): Promise<Song[]> {
    return this.typeOrmRepository.find();
  }

  findByIdOrFail(id: Uuid): Promise<Song> {
    return this.typeOrmRepository.findOneOrFail(id.toString());
  }

  save(room: Song): Promise<Song> {
    return this.typeOrmRepository.save(room);
  }
}
