import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RoomService } from './room/room.service';
import { ExternalRadioService } from './external-radio/external-radio.service';
import { UserService } from './user/user.service';
import { GetUserRoomsHandler } from './room/queries/get-user-rooms/get-user-rooms.handler';
import { ServerInfrastructureModule } from '@mas/server/infrastructure';
import {
  ExternalRadioRepository,
  RegisteredUserRepository,
  RoomRepository,
  UserRepository,
} from '@mas/server/core/domain-services';
import { RoomRepositoryAdapter } from '../../../../infrastructure/src/lib/typeorm/repositories/room-repository.adapter';
import { RegisteredUserRepositoryAdapter } from '../../../../infrastructure/src/lib/typeorm/repositories/registered-user-repository.adapter';
import { UserRepositoryAdapter } from '../../../../infrastructure/src/lib/typeorm/repositories/user-repository.adapter';
import { AuthenticateHandler } from './user/queries/authenticate/authenticate.handler';
import { RegisteredUserService } from './user/registered-user.service';
import { JoinHandler } from './room/commands/join/join.handler';
import { ExternalRadioRepositoryAdapter } from '../../../../infrastructure/src/lib/typeorm/repositories/external-radio-repository.adapter';
import { GetAllExternalRadiosHandler } from './external-radio/queries/get-all-external-radios/get-all-external-radios.handler';
import { SelectExternalRadioHandler } from './user/commands/select-external-radio/select-external-radio.handler';

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
  ],
  exports: [
    RoomService,
    ExternalRadioService,
    UserService,
    RegisteredUserService,
  ],
})
export class ServerCoreApplicationServicesModule {}
