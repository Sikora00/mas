import {
  ExternalRadioRepository,
  RegisteredUserRepository,
  RoomRepository,
  UserRepository,
} from '@mas/server/core/domain-services';
import { ServerInfrastructureModule } from '@mas/server/infrastructure';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ExternalRadioRepositoryAdapter } from '../../../../infrastructure/src/lib/typeorm/repositories/external-radio-repository.adapter';
import { RegisteredUserRepositoryAdapter } from '../../../../infrastructure/src/lib/typeorm/repositories/registered-user-repository.adapter';
import { RoomRepositoryAdapter } from '../../../../infrastructure/src/lib/typeorm/repositories/room-repository.adapter';
import { UserRepositoryAdapter } from '../../../../infrastructure/src/lib/typeorm/repositories/user-repository.adapter';
import { ExternalRadioService } from './external-radio/external-radio.service';
import { GetAllExternalRadiosHandler } from './external-radio/queries/get-all-external-radios/get-all-external-radios.handler';
import { JoinHandler } from './room/commands/join/join.handler';
import { GetRoomStreamHandler } from './room/queries/get-room-stream/get-room-stream.handler';
import { GetUserRoomsHandler } from './room/queries/get-user-rooms/get-user-rooms.handler';
import { RoomService } from './room/room.service';
import { SelectExternalRadioHandler } from './user/commands/select-external-radio/select-external-radio.handler';
import { AuthenticateHandler } from './user/queries/authenticate/authenticate.handler';
import { RegisteredUserService } from './user/registered-user.service';
import { UserService } from './user/user.service';

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
  ],
  exports: [
    RoomService,
    ExternalRadioService,
    UserService,
    RegisteredUserService,
  ],
})
export class ServerCoreApplicationServicesModule {}
