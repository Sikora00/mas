import { Module } from '@nestjs/common';
import { ExternalRadioController } from './external-radio/external-radio.controller';
import { RoomController } from './room/room.controller';
import { ServerCoreApplicationServicesModule } from '@mas/server/core/application-services';
import { UserController } from './user/user.controller';

@Module({
  controllers: [ExternalRadioController, RoomController, UserController],
  imports: [ServerCoreApplicationServicesModule],
  exports: [],
})
export class ServerUiApiModule {}
