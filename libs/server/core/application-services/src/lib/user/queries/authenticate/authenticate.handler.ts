import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { AuthenticateQuery } from './authenticate.query';
import { AuthenticatedUserReadModel } from './authenticated-user.read-model';
import { RegisteredUserRepository } from '@mas/server/core/domain-services';

@QueryHandler(AuthenticateQuery)
export class AuthenticateHandler implements IQueryHandler<AuthenticateQuery> {
  constructor(private registeredUserRepository: RegisteredUserRepository) {}

  async execute(query: AuthenticateQuery): Promise<AuthenticatedUserReadModel> {
    return new AuthenticatedUserReadModel(
      (await this.registeredUserRepository.findAll())[0].getId()
    );
  }
}
