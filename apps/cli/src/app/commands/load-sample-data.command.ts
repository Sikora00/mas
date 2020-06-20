import {
  ExternalRadio,
  RegisteredUser,
  Room,
  Song,
  Uuid,
} from '@mas/server/core/domain';
import {
  ExternalRadioRepository,
  RegisteredUserRepository,
  RoomRepository,
} from '@mas/server/core/domain-services';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Command } from 'nestjs-command';
import { getConnection, Repository } from 'typeorm';
import { Genre } from '../../../../../libs/server/core/domain/src/lib/entities/genre';
import { Playlist } from '../../../../../libs/server/core/domain/src/lib/entities/playlist';
import { Vote } from '../../../../../libs/server/core/domain/src/lib/entities/vote';
import { MusicGenreType } from '../../../../../libs/server/core/domain/src/lib/value-objects/music-genre-type';
import { VoteValue } from '../../../../../libs/server/core/domain/src/lib/value-objects/vote-value';
import { GenreSchema } from '../../../../../libs/server/infrastructure/src/lib/typeorm/schemas/genre.schema';
import { PlaylistSchema } from '../../../../../libs/server/infrastructure/src/lib/typeorm/schemas/playlist.schema';
import { SongSchema } from '../../../../../libs/server/infrastructure/src/lib/typeorm/schemas/song.schema';
import { VoteSchema } from '../../../../../libs/server/infrastructure/src/lib/typeorm/schemas/vote.schema';

@Injectable()
export class LoadSampleDataCommand {
  constructor(
    private externalRadioRepository: ExternalRadioRepository,
    private registeredUserRepository: RegisteredUserRepository,
    private roomRepository: RoomRepository,
    @InjectRepository(SongSchema) private songRepository: Repository<Song>,
    @InjectRepository(PlaylistSchema)
    private playlistRepository: Repository<Playlist>,
    @InjectRepository(GenreSchema) private genreRepository: Repository<Genre>,
    @InjectRepository(VoteSchema) private voteRepository: Repository<Vote>
  ) {}

  @Command({
    command: 'data:load',
    describe: 'load sample data',
    autoExit: true,
  })
  async exec(): Promise<void> {
    await getConnection().synchronize(true);
    const user = RegisteredUser.register(
      Uuid.fromString('CBA99AC3-97AF-4906-A120-6BEF5B41674E'),
      'Maciej',
      's17265',
      '1234'
    );
    await this.registeredUserRepository.save(user);
    const rockRoom = Room.create(
      Uuid.fromString('9f7cad36-b722-4ebf-8345-cf7181659918'),
      'Rock',
      user
    );
    await rockRoom.saveByUser(user);
    const popRoom = Room.create(
      Uuid.fromString('c814add1-b24f-46b9-a372-56c59eefb364'),
      'Pop',
      user
    );
    await popRoom.saveByUser(user);
    await this.roomRepository.save(rockRoom);
    await this.roomRepository.save(popRoom);
    const radioZet = ExternalRadio.create(
      'Radio Zet',
      new URL(
        'https://upload.wikimedia.org/wikipedia/commons/4/4b/Radio_ZET_logo.png'
      ),
      new URL('https://n-4-14.dcs.redcdn.pl/sc/o2/Eurozet/live/audio.livx')
    );
    const rmfFM = ExternalRadio.create(
      'RMF FM',
      new URL(
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/RMF_FM_logo.svg/1200px-RMF_FM_logo.svg.png'
      ),
      new URL('http://rmfstream2.interia.pl:8000/rmf_fm')
    );
    await this.externalRadioRepository.save(radioZet);
    await this.externalRadioRepository.save(rmfFM);

    const fobSong = Song.create(
      Uuid.fromString('cb096865-51e3-4b3e-b6fb-065d4fc5ea3f'),
      'Fall Out Boy - Irresistible ft. Demi Lovato',
      new URL('https://img.youtube.com/vi/2Lb2BiUC898/mqdefault.jpg')
    );
    const megadethSong = Song.create(
      Uuid.fromString('BB3E76CC-8C0D-4E6E-8ED8-880ECEAFDD53'),
      'Megadeth - Countdown To Extinction',
      new URL('https://img.youtube.com/vi/-hk1LzKELoo/mqdefault.jpg')
    );
    const enriqueSong = Song.create(
      Uuid.fromString('BB3E76CC-8C0D-4E6E-8ED8-880ECEAFDD54'),
      "Matoma & Enrique Iglesias – I Don't Dance",
      new URL('https://img.youtube.com/vi/_D1rrdFcj1U/mqdefault.jpg')
    );
    await this.songRepository.save(fobSong);
    await this.songRepository.save(megadethSong);
    await this.songRepository.save(enriqueSong);

    const popAndRockGenre = Genre.create(
      'PopRock',
      new Set([MusicGenreType.Rock, MusicGenreType.Pop])
    );
    await fobSong.setGenre(popAndRockGenre);
    await this.genreRepository.save(popAndRockGenre);

    const playlist = Playlist.create('Amazing Playlist');
    await Promise.all([
      playlist.addSong(fobSong),
      playlist.addSong(megadethSong),
      playlist.addSong(enriqueSong),
    ]);
    await this.playlistRepository.save(playlist);

    await popRoom.addToQueue(enriqueSong, user);
    await popRoom.addToQueue(megadethSong, user);
    await popRoom.addToQueue(fobSong, user);
    await popRoom.playNextSong();

    await popRoom.vote(VoteValue.Positive, user);
    await this.roomRepository.save(popRoom);
  }
}
