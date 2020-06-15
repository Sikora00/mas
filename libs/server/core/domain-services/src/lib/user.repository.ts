import { User, Uuid } from '@mas/server/core/domain';

export abstract class UserRepository {
  abstract findByIdOrFail(id: Uuid): Promise<User>;

  abstract save(user: User): Promise<User>;
}
