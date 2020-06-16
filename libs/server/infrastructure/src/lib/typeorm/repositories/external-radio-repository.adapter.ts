import { ExternalRadio, Uuid } from '@mas/server/core/domain';
import { ExternalRadioRepository } from '@mas/server/core/domain-services';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExternalRadioSchema } from '../schemas/external-radio.schema';

@Injectable()
export class ExternalRadioRepositoryAdapter implements ExternalRadioRepository {
  constructor(
    @InjectRepository(ExternalRadioSchema)
    private typeOrmRepository: Repository<ExternalRadio>
  ) {}

  findAll(): Promise<ExternalRadio[]> {
    return this.typeOrmRepository.find();
  }

  findByIdOrFail(id: Uuid): Promise<ExternalRadio> {
    return this.typeOrmRepository.findOneOrFail(id.toString());
  }

  save(room: ExternalRadio): Promise<ExternalRadio> {
    return this.typeOrmRepository.save(room);
  }
}
