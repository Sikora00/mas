import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExternalRadioSchema } from './schemas/external-radio.schema';
import { GenreSchema } from './schemas/genre.schema';
import { GuestSchema } from './schemas/gues.schema';
import { ModeratorSchema } from './schemas/moderator.schema';
import { PlaylistSchema } from './schemas/playlist.schema';
import { QueuedSongSchema } from './schemas/queued-song.schema';
import { RegisteredUserSchema } from './schemas/registered-user.schema';
import { RoomSchema } from './schemas/room.schema';
import { SongSchema } from './schemas/song.schema';
import { UserSchema } from './schemas/user.schema';
import { VoteSchema } from './schemas/vote.schema';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'twoj-dj',
      password: 'mysecretpassword',
      database: 'twoj-dj',
      autoLoadEntities: true,
      synchronize: true,
      logging: ['error'],
    }),
    TypeOrmModule.forFeature([
      ExternalRadioSchema,
      GenreSchema,
      QueuedSongSchema,
      SongSchema,
      PlaylistSchema,
      UserSchema, // Must be before child
      GuestSchema,
      RegisteredUserSchema,
      ModeratorSchema,
      RoomSchema,
      VoteSchema,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class TypeOrmRootModule {}
