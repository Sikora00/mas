import { Injectable } from '@nestjs/common';
import { ExternalRadioRepository } from '@mas/server/core/domain-services';
import { InjectRepository } from '@nestjs/typeorm';
import { ExternalRadioSchema } from '../schemas/external-radio.schema';
import { ExternalRadio, Uuid } from '@mas/server/core/domain';
import { Repository } from 'typeorm';

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
