import { Controller, Get } from '@nestjs/common';
import { AllSongsItemReadModel } from '../../../../core/application-services/src/lib/song/queries/all-songs/all-songs-item.read-model';
import { SongService } from '../../../../core/application-services/src/lib/song/song.service';

@Controller('song')
export class SongController {
  constructor(private songService: SongService) {}

  /**
   * A REST API Entry point to the List Songs Use Case
   */
  @Get()
  getAllSongs(): Promise<AllSongsItemReadModel[]> {
    return this.songService.getAllSongs();
  }
}
