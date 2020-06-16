import { ServerInfrastructureModule } from '@mas/server/infrastructure';
import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { LoadSampleDataCommand } from './commands/load-sample-data.command';
import { PlaySongCommand } from './commands/play-song.command';

@Module({
  imports: [CommandModule, ServerInfrastructureModule],
  providers: [LoadSampleDataCommand, PlaySongCommand],
})
export class AppModule {}
