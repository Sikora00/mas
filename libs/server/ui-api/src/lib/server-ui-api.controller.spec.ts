import { Test } from '@nestjs/testing';
import { ServerUiApiController } from './server-ui-api.controller';

describe('ServerUiApiController', () => {
  let controller: ServerUiApiController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ServerUiApiController],
    }).compile();

    controller = module.get(ServerUiApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
