import { Test } from '@nestjs/testing';
import { ServerCoreDomainServicesController } from './server-core-domain-services.controller';

describe('ServerCoreDomainServicesController', () => {
  let controller: ServerCoreDomainServicesController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ServerCoreDomainServicesController],
    }).compile();

    controller = module.get(ServerCoreDomainServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
