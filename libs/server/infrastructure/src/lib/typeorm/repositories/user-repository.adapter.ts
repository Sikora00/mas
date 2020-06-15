import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisteredUser, User, Uuid } from '@mas/server/core/domain';
import { Repository } from 'typeorm';
import { UserRepository } from '@mas/server/core/domain-services';
import { RegisteredUserSchema } from '../schemas/registered-user.schema';

@Injectable()
export class UserRepositoryAdapter implements UserRepository {
  constructor(
    @InjectRepository(RegisteredUserSchema)
    private typeOrmRegisteredUserRepository: Repository<RegisteredUser>
  ) {}

  findByIdOrFail(id: Uuid): Promise<User> {
    return this.typeOrmRegisteredUserRepository.findOneOrFail(id.toString());
  }

  save(user: User): Promise<User> {
    return this.typeOrmRegisteredUserRepository.save(user);
  }
}
