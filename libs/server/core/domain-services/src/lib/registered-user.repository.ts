import { RegisteredUser, Uuid } from '@mas/server/core/domain';

export abstract class RegisteredUserRepository {
  abstract findByIdOrFail(id: Uuid): Promise<RegisteredUser>;

  abstract findAll(): Promise<RegisteredUser[]>;

  abstract save(user: RegisteredUser): Promise<RegisteredUser>;
}
