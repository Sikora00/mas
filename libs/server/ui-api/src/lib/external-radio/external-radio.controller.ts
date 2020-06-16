import { Controller, Get } from '@nestjs/common';
import { ExternalRadioService } from '../../../../core/application-services/src/lib/external-radio/external-radio.service';
import { ExternalRadioReadModel } from '../../../../core/application-services/src/lib/external-radio/queries/get-all-external-radios/external-radio.read-model';
import { GetAllExternalRadiosQuery } from '../../../../core/application-services/src/lib/external-radio/queries/get-all-external-radios/get-all-external-radios.query';

@Controller('external-radio')
export class ExternalRadioController {
  constructor(private externalRadioService: ExternalRadioService) {}

  @Get()
  getAll(): Promise<ExternalRadioReadModel[]> {
    return this.externalRadioService.getAllExternalRadios(
      new GetAllExternalRadiosQuery()
    );
  }
}
