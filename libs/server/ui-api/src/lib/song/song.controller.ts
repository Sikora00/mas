import { Controller, Get } from '@nestjs/common';
import { AllSongsItemReadModel } from '../../../../core/application-services/src/lib/song/queries/all-songs/all-songs-item.read-model';
import { SongService } from '../../../../core/application-services/src/lib/song/song.service';

@Controller('song')
export class SongController {
  constructor(private songService: SongService) {}

  @Get()
  getAllSongs(): Promise<AllSongsItemReadModel[]> {
    return this.songService.getAllSongs();
  }
}
