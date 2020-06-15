import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RegisteredUserService } from '../../../../core/application-services/src/lib/user/registered-user.service';
import { AuthenticateQuery } from '../../../../core/application-services/src/lib/user/queries/authenticate/authenticate.query';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private registeredUserService: RegisteredUserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    context
      .switchToHttp()
      .getRequest().user = await this.registeredUserService.authenticate(
      new AuthenticateQuery()
    );
    return true;
  }
}