import { UserRepository } from '@mas/server/core/domain-services';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CurrentUserReadModel } from './current-user.read-model';
import { GetCurrentUserQuery } from './get-current-user.query';

@QueryHandler(GetCurrentUserQuery)
export class GetCurrentUserHandler
  implements IQueryHandler<GetCurrentUserQuery> {
  constructor(private userRepository: UserRepository) {}

  async execute(query: GetCurrentUserQuery): Promise<CurrentUserReadModel> {
    return this.userRepository
      .findByIdOrFail(query.userId)
      .then(
        (user) =>
          new CurrentUserReadModel(
            user.getId().toString(),
            user.getSelectedExternalRadio()?.getId().toString()
          )
      );
  }
}
