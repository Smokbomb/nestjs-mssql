import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffService } from 'staff/staff.service';
import { Staff } from 'staff/staff.entity';
import { StaffController } from './staff.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Staff])],
  providers: [StaffService],
  controllers: [StaffController],
})
export class StaffModule {}