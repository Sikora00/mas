import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { AuthenticateQuery } from './queries/authenticate/authenticate.query';
import { AuthenticatedUserReadModel } from './queries/authenticate/authenticated-user.read-model';

@Injectable()
export class RegisteredUserService {
  constructor(private queryBus: QueryBus) {}

  async authenticate(
    query: AuthenticateQuery
  ): Promise<AuthenticatedUserReadModel> {
    return this.queryBus.execute(query);
  }
}
