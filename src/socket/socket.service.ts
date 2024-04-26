import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class SocketService {
     private readonly connectedClients: Map<string, Socket> = new Map();

     // Connection events
     handleConnection(socket: Socket): void {
          const clientId = socket.id;
          console.log('Socket Client connected :>> ', clientId);
          this.connectedClients.set(clientId, socket);
     };

     // Disconnection events
     handleDisconnect(socket: Socket): void {
          const clientId = socket.id;
          console.log('Socket Client disconnected :>> ', clientId);
          this.connectedClients.delete(clientId);
     };
     


};
