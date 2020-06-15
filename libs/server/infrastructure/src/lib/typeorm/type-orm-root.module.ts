import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomSchema } from './schemas/room.schema';
import { UserSchema } from './schemas/user.schema';
import { RegisteredUserSchema } from './schemas/registered-user.schema';
import { ExternalRadioSchema } from './schemas/external-radio.schema';

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
      RoomSchema,
      UserSchema,
      RegisteredUserSchema,
      ExternalRadioSchema,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class TypeOrmRootModule {}
