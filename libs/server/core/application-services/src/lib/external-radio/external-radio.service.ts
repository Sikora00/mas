import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ExternalRadioReadModel } from './queries/get-all-external-radios/external-radio.read-model';
import { GetAllExternalRadiosQuery } from './queries/get-all-external-radios/get-all-external-radios.query';

@Injectable()
export class ExternalRadioService {
  constructor(private queryBus: QueryBus) {}

  getAllExternalRadios(
    query: GetAllExternalRadiosQuery
  ): Promise<ExternalRadioReadModel[]> {
    return this.queryBus.execute(query);
  }
}
