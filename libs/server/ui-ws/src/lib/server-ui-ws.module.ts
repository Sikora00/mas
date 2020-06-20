import { ServerCoreApplicationServicesModule } from '@mas/server/core/application-services';
import { Module } from '@nestjs/common';
import { CurrentSongChangedEventHandler } from './handlers/current-song-changed-event.handler';
import { QueueChangedEventHandler } from './handlers/queue-changed-event.handler';
import { RoomPlayingEventsHandler } from './handlers/room-playing-events.handler';
import { UserChangedPotentialMusicSourceEventHandler } from './handlers/user-changed-potential-music-source-event.handler';
import { UserJoinedRoomEventHandler } from './handlers/user-joined-room.handler';
import { UserLeavedRoomEventHandler } from './handlers/user-leaved-room.handler';
import { MainGateway } from './main.gateway';

@Module({
  imports: [ServerCoreApplicationServicesModule],
  providers: [
    MainGateway,
    CurrentSongChangedEventHandler,
    RoomPlayingEventsHandler,
    UserChangedPotentialMusicSourceEventHandler,
    UserJoinedRoomEventHandler,
    UserLeavedRoomEventHandler,
    QueueChangedEventHandler,
  ],
  exports: [],
})
export class ServerUiWsModule {}
