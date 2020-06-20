import { Room, Uuid } from '@mas/server/core/domain';
import { RoomRepository } from '@mas/server/core/domain-services';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomSchema } from '../schemas/room.schema';

@Injectable()
export class RoomRepositoryAdapter implements RoomRepository {
  constructor(
    @InjectRepository(RoomSchema) private typeOrmRepository: Repository<Room>
  ) {}

  findAll(): Promise<Room[]> {
    return this.typeOrmRepository.find();
  }

  findByIdOrFail(id: Uuid): Promise<Room> {
    return this.typeOrmRepository.findOneOrFail(id.toString());
  }

  save(room: Room): Promise<Room> {
    return this.typeOrmRepository.save(room);
  }
}
