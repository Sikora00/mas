import { Uuid } from '@mas/server/core/domain';
import { Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { SelectExternalRadioCommand } from '../../../../core/application-services/src/lib/user/commands/select-external-radio/select-external-radio.command';
import { AuthenticatedUserReadModel } from '../../../../core/application-services/src/lib/user/queries/authenticate/authenticated-user.read-model';
import { CurrentUserReadModel } from '../../../../core/application-services/src/lib/user/queries/get-current-user/current-user.read-model';
import { GetCurrentUserQuery } from '../../../../core/application-services/src/lib/user/queries/get-current-user/get-current-user.query';
import { UserService } from '../../../../core/application-services/src/lib/user/user.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../request-decorators/current-user.request-decorator';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('current')
  getCurrentUser(
    @CurrentUser() user: AuthenticatedUserReadModel
  ): Promise<CurrentUserReadModel> {
    return this.userService.getCurrentUser(new GetCurrentUserQuery(user.id));
  }

  @Put('external-radio/:id')
  selectExternalRadio(
    @CurrentUser() user: AuthenticatedUserReadModel,
    @Param('id') id: string
  ): Promise<void> {
    return this.userService.selectExternalRadio(
      new SelectExternalRadioCommand(user.id, Uuid.fromString(id))
    );
  }
}
