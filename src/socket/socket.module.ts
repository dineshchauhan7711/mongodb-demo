import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { SocketService } from './socket.service';
import { SocketAuthService } from "./socket.auth";

@Module({
  providers: [SocketGateway, SocketService, SocketAuthService],
})
export class SocketModule { }