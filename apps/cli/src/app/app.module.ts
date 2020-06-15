import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { ServerInfrastructureModule } from '@mas/server/infrastructure';
import { LoadSampleDataCommand } from './commands/load-sample-data.command';

@Module({
  imports: [CommandModule, ServerInfrastructureModule],
  providers: [LoadSampleDataCommand],
})
export class AppModule {}
