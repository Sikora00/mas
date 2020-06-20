import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { AllSongsItemReadModel } from './queries/all-songs/all-songs-item.read-model';
import { AllSongsQuery } from './queries/all-songs/all-songs.query';

@Injectable()
export class SongService {
  constructor(private queryBus: QueryBus) {}

  async getAllSongs(): Promise<AllSongsItemReadModel[]> {
    return this.queryBus.execute(new AllSongsQuery());
  }
}
