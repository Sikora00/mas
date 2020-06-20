import { EntitySchema } from 'typeorm';
import { Genre } from '../../../../../core/domain/src/lib/entities/genre';
import { MusicGenreType } from '../../../../../core/domain/src/lib/value-objects/music-genre-type';

export const GenreSchema = new EntitySchema<any>({
  target: Genre,
  name: 'Genre',
  columns: {
    id: {
      primary: true,
      type: String,
    },
    name: {
      type: String,
    },
    types: {
      type: 'simple-array',
      transformer: {
        to(value: Set<MusicGenreType>): MusicGenreType[] {
          return Array.from(value);
        },
        from(value: MusicGenreType[]): Set<MusicGenreType> {
          return new Set(value);
        },
      },
    },
  },
  relations: {
    songs: {
      lazy: true,
      type: 'one-to-many',
      target: 'Song',
      inverseSide: 'genre',
    },
  },
});
