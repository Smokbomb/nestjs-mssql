import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { StaffModule } from 'staff/staff.module';
import { PhotoModule } from 'photo/photo.module';
import { EventsModule } from 'socket/events/events.module';
import { GraphQLModule } from '@nestjs/graphql';
@Module({
  imports: [TypeOrmModule.forRoot(), StaffModule, PhotoModule, EventsModule, GraphQLModule.forRoot({
    typePaths: ['./**/*.graphql'],
    installSubscriptionHandlers: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
