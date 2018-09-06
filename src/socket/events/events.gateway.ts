import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PhotoService } from 'photo/photo.service';
@WebSocketGateway()
export class EventsGateway {
    constructor(private readonly photoService: PhotoService) { }
    @WebSocketServer() server;

    @SubscribeMessage('events')
    findAll(client, data): Observable<WsResponse<any>> {
        return from(this.photoService.findAll()).pipe(map(item => ({ event: 'events', data: item })));
    }

    @SubscribeMessage('identity')
    async identity(client, data: number): Promise<number> {
        return data;
    }
}