import { Module } from '@nestjs/common';
import { ExternalRadioRepositoryAdapter } from './typeorm/repositories/external-radio-repository.adapter';
import { RegisteredUserRepositoryAdapter } from './typeorm/repositories/registered-user-repository.adapter';
import { RoomRepositoryAdapter } from './typeorm/repositories/room-repository.adapter';
import { SongRepositoryAdapter } from './typeorm/repositories/song-repository.adapter';
import { UserRepositoryAdapter } from './typeorm/repositories/user-repository.adapter';
import { TypeOrmRootModule } from './typeorm/type-orm-root.module';

@Module({
  imports: [TypeOrmRootModule],
  providers: [
    ExternalRadioRepositoryAdapter,
    RoomRepositoryAdapter,
    RegisteredUserRepositoryAdapter,
    SongRepositoryAdapter,
    UserRepositoryAdapter,
  ],
  exports: [
    ExternalRadioRepositoryAdapter,
    TypeOrmRootModule,
    RoomRepositoryAdapter,
    RegisteredUserRepositoryAdapter,
    SongRepositoryAdapter,
    UserRepositoryAdapter,
  ],
})
export class ServerInfrastructureModule {}
