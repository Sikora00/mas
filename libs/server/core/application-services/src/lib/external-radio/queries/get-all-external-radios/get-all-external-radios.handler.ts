import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllExternalRadiosQuery } from './get-all-external-radios.query'
import { ExternalRadioRepository } from "@mas/server/core/domain-services";
import { ExternalRadioReadModel } from "./external-radio.read-model";


@QueryHandler(GetAllExternalRadiosQuery)
export class GetAllExternalRadiosHandler implements IQueryHandler<GetAllExternalRadiosQuery> {
  constructor(private externalRadioRepository: ExternalRadioRepository) {
  }

  async execute(query: GetAllExternalRadiosQuery): Promise<GetAllExternalRadiosQuery[]> {
    const radios = await this.externalRadioRepository.findAll()
    return radios.map(radio => new ExternalRadioReadModel(radio.getId().toString(), radio.getName(), radio.getLogoUrl().toString()))
  }
}
