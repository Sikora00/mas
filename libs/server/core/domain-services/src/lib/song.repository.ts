import { Song, Uuid } from '@mas/server/core/domain';

export abstract class SongRepository {
  abstract findAll(): Promise<Song[]>;

  abstract findByIdOrFail(id: Uuid): Promise<Song>;

  abstract save(song: Song): Promise<Song>;
}
