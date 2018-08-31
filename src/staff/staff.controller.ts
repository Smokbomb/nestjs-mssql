import { Controller, Get } from '@nestjs/common';
import { StaffService } from './staff.service';
import { Staff } from './staff.entity';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Get()
  findAll(): Promise<Staff[]> {
    return this.staffService.findAll();
  }
}
