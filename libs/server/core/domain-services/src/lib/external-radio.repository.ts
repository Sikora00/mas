import { ExternalRadio, Uuid } from '@mas/server/core/domain';

export abstract class ExternalRadioRepository {
  abstract findByIdOrFail(id: Uuid): Promise<ExternalRadio>;

  abstract findAll(): Promise<ExternalRadio[]>;

  abstract save(radio: ExternalRadio): Promise<ExternalRadio>;
}
