import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { SocketService } from './socket.service';
import { SocketAuthMiddleware } from "./socket.auth";
@Module({
  providers: [SocketGateway, SocketService, SocketAuthMiddleware],
})
export class SocketModule { }