import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExternalRadioSchema } from './schemas/external-radio.schema';
import { QueuedSongSchema } from './schemas/queued-song.schema';
import { RegisteredUserSchema } from './schemas/registered-user.schema';
import { RoomSchema } from './schemas/room.schema';
import { SongSchema } from './schemas/song.schema';
import { UserSchema } from './schemas/user.schema';

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
      QueuedSongSchema,
      SongSchema,
      UserSchema, // Must be before child
      RegisteredUserSchema,
      RoomSchema,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class TypeOrmRootModule {}
