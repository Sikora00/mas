import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedUserReadModel } from '@mas/server/core/application-services';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): AuthenticatedUserReadModel => {
    return context.switchToHttp().getRequest().user;
  }
);
