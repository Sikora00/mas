import { Test, TestingModule } from '@nestjs/testing';
import { ExternalRadioController } from './external-radio.controller';

describe('ExternalRadio Controller', () => {
  let controller: ExternalRadioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExternalRadioController],
    }).compile();

    controller = module.get<ExternalRadioController>(ExternalRadioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
