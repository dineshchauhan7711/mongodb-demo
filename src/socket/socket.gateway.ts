import { WebSocketGateway, OnGatewayConnection, WebSocketServer, SubscribeMessage, WsResponse } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketService } from './socket.service';
import { Observable } from 'rxjs';


@WebSocketGateway({
     cors: {
          origin: '*',
     },
})

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection {
     @WebSocketServer()
     private server: Socket;

     constructor(private readonly socketService: SocketService) { }

     // Connection events
     handleConnection(socket: Socket): void {
          this.socketService.handleConnection(socket);
     };

     // Disconnection events
     handleDisconnect(socket: Socket): void {
          this.socketService.handleDisconnect(socket);
     };

     // Send Message
     @SubscribeMessage('sendMessage')
     onEvent(client: any, payload: any): Observable<WsResponse<any>> | any {
          console.log('client :>> ', client.id);
          console.log('payload :>> ', payload);
          this.server.emit('getMessage', payload);
     };

     
}