import { Module } from '@nestjs/common';
import { ExternalRadioRepositoryAdapter } from './typeorm/repositories/external-radio-repository.adapter';
import { RegisteredUserRepositoryAdapter } from './typeorm/repositories/registered-user-repository.adapter';
import { RoomRepositoryAdapter } from './typeorm/repositories/room-repository.adapter';
import { UserRepositoryAdapter } from './typeorm/repositories/user-repository.adapter';
import { TypeOrmRootModule } from './typeorm/type-orm-root.module';

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
