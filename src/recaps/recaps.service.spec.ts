import { Test, TestingModule } from '@nestjs/testing';
import { RecapsService } from './recaps.service';

describe('RecapsService', () => {
  let service: RecapsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecapsService],
    }).compile();

    service = module.get<RecapsService>(RecapsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
