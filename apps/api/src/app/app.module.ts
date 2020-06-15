import { Module } from '@nestjs/common';
import { ServerUiApiModule } from '@mas/server/ui-api';

@Module({
  imports: [ServerUiApiModule],
  providers: [],
})
export class AppModule {}
