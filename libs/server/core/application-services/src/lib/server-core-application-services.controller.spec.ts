import { Test } from '@nestjs/testing';
import { ServerCoreApplicationServicesController } from './server-core-application-services.controller';

describe('ServerCoreApplicationServicesController', () => {
  let controller: ServerCoreApplicationServicesController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ServerCoreApplicationServicesController],
    }).compile();

    controller = module.get(ServerCoreApplicationServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
