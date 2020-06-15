import { createParamDecorator } from '@nestjs/common';
import { AuthenticatedUserReadModel } from '../../../../core/application-services/src/lib/user/queries/authenticate/authenticated-user.read-model';

export const CurrentUser = createParamDecorator(
  (data: unknown, request): AuthenticatedUserReadModel => {
    return request.user;
  }
);
