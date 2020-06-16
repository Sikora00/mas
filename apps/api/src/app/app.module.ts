import { ServerUiApiModule } from '@mas/server/ui-api';
import { Module } from '@nestjs/common';

@Module({
  imports: [ServerUiApiModule],
  providers: [],
})
export class AppModule {}
