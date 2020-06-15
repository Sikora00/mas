import { Controller, Param, Put, UseGuards } from '@nestjs/common';
import { CurrentUser } from "../request-decorators/current-user.request-decorator";
import { Uuid } from "@mas/server/core/domain";
import { UserService } from "../../../../core/application-services/src/lib/user/user.service";
import { AuthenticatedUserReadModel } from "../../../../core/application-services/src/lib/user/queries/authenticate/authenticated-user.read-model";
import { SelectExternalRadioCommand } from "../../../../core/application-services/src/lib/user/commands/select-external-radio/select-external-radio.command";
import { AuthGuard } from "../guards/auth.guard";

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {
  }

  @Put('external-radio/:id')
  selectExternalRadio(@CurrentUser() user: AuthenticatedUserReadModel, @Param('id')id: string): Promise<void> {
    return this.userService.selectExternalRadio(new SelectExternalRadioCommand(user.id, Uuid.fromString(id)))
  }

}
