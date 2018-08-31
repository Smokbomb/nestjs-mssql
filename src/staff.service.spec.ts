import { Test, TestingModule } from '@nestjs/testing';
import { StaffService } from './staff/staff.service';

describe('StaffService', () => {
  let service: StaffService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StaffService],
    }).compile();
    service = module.get<StaffService>(StaffService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
