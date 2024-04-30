import { WebSocketGateway, OnGatewayConnection, WebSocketServer, SubscribeMessage, WsResponse, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Observable } from 'rxjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Services
import { SocketService } from './socket.service';

// Models
import { SocketId, SocketIdDocument } from "../model/user_socket_id.model";

interface CustomSocket extends Socket {
     user?: {
          id: string;
          socketId: string;
     }
}

@WebSocketGateway({
     cors: {
          origin: '*',
     },
})

export class SocketGateway implements OnGatewayConnection {
     @WebSocketServer()
     private server: CustomSocket;
     constructor(
          private readonly socketService: SocketService
     ) { }
     @InjectModel('SocketId') private readonly SocketIdModel: Model<SocketIdDocument>;


     // // Connection events
     async handleConnection(socket: CustomSocket): Promise<void> {
          this.socketService.handleConnection(socket);
     };

     // // Disconnection events
     handleDisconnect(socket: CustomSocket): void {
          this.socketService.handleDisconnect(socket);
     };

     // // Send Message
     @SubscribeMessage('sendMessage')
     async onEvent(
          @ConnectedSocket() client: CustomSocket,
          @MessageBody() payload: any
     ): Promise<Observable<WsResponse<any>> | any> {
          const message = await this.socketService.sendMessage(client, payload);
          const senders = await this.SocketIdModel.find({ userId: client.user.id }, 'socketId');
          const receivers = await this.SocketIdModel.find({ userId: payload.receiverId },'socketId');
          senders.map((sender) => {
               this.server.to(sender.socketId).emit('getMessage', message);
          });
          receivers.map((receiver) => {
               this.server.to(receiver.socketId).emit('getMessage', message);
          });
     };

}