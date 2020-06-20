import { ServerCoreApplicationServicesModule } from '@mas/server/core/application-services';
import { Module } from '@nestjs/common';
import { ExternalRadioController } from './external-radio/external-radio.controller';
import { RoomController } from './room/room.controller';
import { UserController } from './user/user.controller';
import { SongController } from './song/song.controller';

@Module({
  controllers: [
    ExternalRadioController,
    RoomController,
    UserController,
    SongController,
  ],
  imports: [ServerCoreApplicationServicesModule],
  exports: [],
})
export class ServerUiApiModule {}
