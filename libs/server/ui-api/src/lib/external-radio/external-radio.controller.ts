import { Controller, Get } from '@nestjs/common';
import { ExternalRadioService } from '../../../../core/application-services/src/lib/external-radio/external-radio.service';
import { ExternalRadioReadModel } from '../../../../core/application-services/src/lib/external-radio/queries/get-all-external-radios/external-radio.read-model';
import { GetAllExternalRadiosQuery } from '../../../../core/application-services/src/lib/external-radio/queries/get-all-external-radios/get-all-external-radios.query';

@Controller('external-radio')
export class ExternalRadioController {
  constructor(private externalRadioService: ExternalRadioService) {}

  /**
   * A REST API Entry point to the List External Radios Use Case
   */
  @Get()
  getAll(): Promise<ExternalRadioReadModel[]> {
    return this.externalRadioService.getAllExternalRadios(
      new GetAllExternalRadiosQuery()
    );
  }
}
