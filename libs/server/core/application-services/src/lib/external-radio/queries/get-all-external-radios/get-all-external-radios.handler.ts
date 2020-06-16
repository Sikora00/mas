import { ExternalRadioRepository } from '@mas/server/core/domain-services';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ExternalRadioReadModel } from './external-radio.read-model';
import { GetAllExternalRadiosQuery } from './get-all-external-radios.query';

@QueryHandler(GetAllExternalRadiosQuery)
export class GetAllExternalRadiosHandler
  implements IQueryHandler<GetAllExternalRadiosQuery> {
  constructor(private externalRadioRepository: ExternalRadioRepository) {}

  async execute(
    query: GetAllExternalRadiosQuery
  ): Promise<GetAllExternalRadiosQuery[]> {
    const radios = await this.externalRadioRepository.findAll();
    return radios.map(
      (radio) =>
        new ExternalRadioReadModel(
          radio.getId().toString(),
          radio.getName(),
          radio.getLogoUrl().toString()
        )
    );
  }
}
