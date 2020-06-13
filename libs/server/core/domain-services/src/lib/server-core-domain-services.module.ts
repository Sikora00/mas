import { Module } from '@nestjs/common';

import { ServerCoreDomainServicesController } from './server-core-domain-services.controller';

@Module({
  controllers: [ServerCoreDomainServicesController],
  providers: [],
  exports: [],
})
export class ServerCoreDomainServicesModule {}
