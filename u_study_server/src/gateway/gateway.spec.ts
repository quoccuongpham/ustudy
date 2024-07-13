import { Test, TestingModule } from '@nestjs/testing';
import { Gateway } from './gateway';

describe('Gateway', () => {
  let provider: Gateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Gateway],
    }).compile();

    provider = module.get<Gateway>(Gateway);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
