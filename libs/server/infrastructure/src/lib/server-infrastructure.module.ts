import { Module } from '@nestjs/common';
import { TypeOrmRootModule } from './typeorm/type-orm-root.module';
import { RoomRepositoryAdapter } from './typeorm/repositories/room-repository.adapter';
import { RegisteredUserRepositoryAdapter } from './typeorm/repositories/registered-user-repository.adapter';
import { UserRepositoryAdapter } from './typeorm/repositories/user-repository.adapter';
import { ExternalRadioRepositoryAdapter } from './typeorm/repositories/external-radio-repository.adapter';

@Module({
  imports: [TypeOrmRootModule],
  providers: [
    ExternalRadioRepositoryAdapter,
    RoomRepositoryAdapter,
    RegisteredUserRepositoryAdapter,
    UserRepositoryAdapter,
  ],
  exports: [
    ExternalRadioRepositoryAdapter,
    TypeOrmRootModule,
    RoomRepositoryAdapter,
    RegisteredUserRepositoryAdapter,
    UserRepositoryAdapter,
  ],
})
export class ServerInfrastructureModule {}
