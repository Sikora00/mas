import { Module } from '@nestjs/common';

import { ServerCoreApplicationServicesController } from './server-core-application-services.controller';

@Module({
  controllers: [ServerCoreApplicationServicesController],
  providers: [],
  exports: [],
})
export class ServerCoreApplicationServicesModule {}
