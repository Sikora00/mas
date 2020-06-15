import { Injectable } from '@nestjs/common';
import { RoomRepository } from '@mas/server/core/domain-services';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomSchema } from '../schemas/room.schema';
import { Room, Uuid } from '@mas/server/core/domain';
import { Repository } from 'typeorm';

@Injectable()
export class RoomRepositoryAdapter implements RoomRepository {
  constructor(
    @InjectRepository(RoomSchema) private typeOrmRepository: Repository<Room>
  ) {}

  findByIdOrFail(id: Uuid): Promise<Room> {
    return this.typeOrmRepository.findOneOrFail(id.toString());
  }

  save(room: Room): Promise<Room> {
    return this.typeOrmRepository.save(room);
  }
}
