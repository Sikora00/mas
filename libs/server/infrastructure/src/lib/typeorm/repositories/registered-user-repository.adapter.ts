import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisteredUser, Uuid } from '@mas/server/core/domain';
import { Repository } from 'typeorm';
import { RegisteredUserRepository } from '@mas/server/core/domain-services';
import { RegisteredUserSchema } from '../schemas/registered-user.schema';

@Injectable()
export class RegisteredUserRepositoryAdapter
  implements RegisteredUserRepository {
  constructor(
    @InjectRepository(RegisteredUserSchema)
    private typeOrmRepository: Repository<RegisteredUser>
  ) {}

  findAll(): Promise<RegisteredUser[]> {
    return this.typeOrmRepository.find();
  }

  findByIdOrFail(id: Uuid): Promise<RegisteredUser> {
    return this.typeOrmRepository.findOneOrFail(id.toString());
  }

  save(user: RegisteredUser): Promise<RegisteredUser> {
    return this.typeOrmRepository.save(user);
  }
}
