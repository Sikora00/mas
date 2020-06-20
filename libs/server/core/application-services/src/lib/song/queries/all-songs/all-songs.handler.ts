import { SongRepository } from '@mas/server/core/domain-services';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AllSongsItemReadModel } from './all-songs-item.read-model';
import { AllSongsQuery } from './all-songs.query';

@QueryHandler(AllSongsQuery)
export class AllSongsHandler implements IQueryHandler<AllSongsQuery> {
  constructor(private songRepository: SongRepository) {}

  async execute(query: AllSongsQuery): Promise<AllSongsItemReadModel[]> {
    return (await this.songRepository.findAll()).map(
      (song) =>
        new AllSongsItemReadModel(
          song.getId().toString(),
          song.getTitle(),
          song.getImage().toString()
        )
    );
  }
}
