import { ServerUiApiModule } from '@mas/server/ui-api';
import { ServerUiWsModule } from '@mas/server/ui-ws';
import { Module } from '@nestjs/common';

@Module({
  imports: [ServerUiApiModule, ServerUiWsModule],
  providers: [],
})
export class AppModule {}
