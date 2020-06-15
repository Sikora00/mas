import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import {
  ExternalRadioRepository,
  RegisteredUserRepository,
  RoomRepository,
} from '@mas/server/core/domain-services';
import {
  ExternalRadio,
  RegisteredUser,
  Room,
  Uuid,
} from '@mas/server/core/domain';
import { getConnection } from 'typeorm';

@Injectable()
export class LoadSampleDataCommand {
  constructor(
    private externalRadioRepository: ExternalRadioRepository,
    private registeredUserRepository: RegisteredUserRepository,
    private roomRepository: RoomRepository
  ) {}

  @Command({ command: 'data:load', describe: 'create a user', autoExit: true })
  async exec() {
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
    const popRoom = Room.create(
      Uuid.fromString('c814add1-b24f-46b9-a372-56c59eefb364'),
      'Pop',
      user
    );
    popRoom.saveByUser(user);
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
      new URL('http://rmfstream2.interia.pl:8000/rmf_fm'),

    );
    await this.externalRadioRepository.save(radioZet);
    await this.externalRadioRepository.save(rmfFM);
  }
}
