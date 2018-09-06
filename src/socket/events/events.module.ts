import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { PhotoModule } from 'photo/photo.module';

@Module({
    imports: [PhotoModule],
    providers: [EventsGateway],
})
export class EventsModule { }