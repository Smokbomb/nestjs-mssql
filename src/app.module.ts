import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { StaffModule } from 'staff/staff.module';
import { PhotoModule } from 'photo/photo.module';
@Module({
  imports: [TypeOrmModule.forRoot(), StaffModule, PhotoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
