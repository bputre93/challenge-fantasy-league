import { Test, TestingModule } from '@nestjs/testing';
import { RecapsController } from './recaps.controller';

describe('Recaps Controller', () => {
  let controller: RecapsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecapsController],
    }).compile();

    controller = module.get<RecapsController>(RecapsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
