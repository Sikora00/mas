import {
  ExternalRadioRepository,
  RegisteredUserRepository,
  RoomRepository,
  SongRepository,
  UserRepository,
} from '@mas/server/core/domain-services';
import { ServerInfrastructureModule } from '@mas/server/infrastructure';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ExternalRadioRepositoryAdapter } from '../../../../infrastructure/src/lib/typeorm/repositories/external-radio-repository.adapter';
import { RegisteredUserRepositoryAdapter } from '../../../../infrastructure/src/lib/typeorm/repositories/registered-user-repository.adapter';
import { RoomRepositoryAdapter } from '../../../../infrastructure/src/lib/typeorm/repositories/room-repository.adapter';
import { SongRepositoryAdapter } from '../../../../infrastructure/src/lib/typeorm/repositories/song-repository.adapter';
import { UserRepositoryAdapter } from '../../../../infrastructure/src/lib/typeorm/repositories/user-repository.adapter';
import { ExternalRadioService } from './external-radio/external-radio.service';
import { GetAllExternalRadiosHandler } from './external-radio/queries/get-all-external-radios/get-all-external-radios.handler';
import { JoinHandler } from './room/commands/join/join.handler';
import { GetRoomStreamHandler } from './room/queries/get-room-stream/get-room-stream.handler';
import { GetUserRoomsHandler } from './room/queries/get-user-rooms/get-user-rooms.handler';
import { RoomService } from './room/room.service';
import { AllSongsHandler } from './song/queries/all-songs/all-songs.handler';
import { SongService } from './song/song.service';
import { SelectExternalRadioHandler } from './user/commands/select-external-radio/select-external-radio.handler';
import { AuthenticateHandler } from './user/queries/authenticate/authenticate.handler';
import { RegisteredUserService } from './user/registered-user.service';
import { UserService } from './user/user.service';
import { QueueSongHandler } from './room/commands/queue-song/queue-song.handler';
import { GetCurrentUserHandler } from './user/queries/get-current-user/get-current-user.handler';
import { GetRoomHandler } from './room/queries/get-room/get-room.handler';
import { LeaveHandler } from './room/commands/leave/leave.handler';

@Module({
  imports: [CqrsModule, ServerInfrastructureModule],
  providers: [
    {
      provide: ExternalRadioRepository,
      useExisting: ExternalRadioRepositoryAdapter,
    },
    { provide: RoomRepository, useExisting: RoomRepositoryAdapter },
    {
      provide: RegisteredUserRepository,
      useExisting: RegisteredUserRepositoryAdapter,
    },
    { provide: SongRepository, useExisting: SongRepositoryAdapter },
    { provide: UserRepository, useExisting: UserRepositoryAdapter },

    RoomService,
    ExternalRadioService,
    UserService,
    GetUserRoomsHandler,
    RegisteredUserService,
    AuthenticateHandler,
    JoinHandler,
    GetAllExternalRadiosHandler,
    SelectExternalRadioHandler,
    GetRoomStreamHandler,
    SongService,
    AllSongsHandler,
    QueueSongHandler,
    GetCurrentUserHandler,
    GetRoomHandler,
    LeaveHandler,
  ],
  exports: [
    RoomRepository,
    UserRepository,
    RoomService,
    ExternalRadioService,
    UserService,
    RegisteredUserService,
    SongService,
    ServerInfrastructureModule,
  ],
})
export class ServerCoreApplicationServicesModule {}
