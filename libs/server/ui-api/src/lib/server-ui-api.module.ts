import { Module } from '@nestjs/common';

import { ServerUiApiController } from './server-ui-api.controller';

@Module({
  controllers: [ServerUiApiController],
  providers: [],
  exports: [],
})
export class ServerUiApiModule {}
