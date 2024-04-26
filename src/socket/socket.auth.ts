// socket-auth.middleware.ts
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Socket } from 'socket.io';
import jwt from 'jsonwebtoken';

@Injectable()
export class SocketAuthMiddleware implements NestMiddleware {
     use(socket: Socket, next: Function) {
          if (!socket.handshake.query.token) {
               throw new UnauthorizedException('Authentication error: Token missing');
          }

          try {
               const decoded = jwt.verify(socket.handshake.headers.authorization, process.env.JWT_SECRET);
               if (decoded) {
                    next();
               }
          } catch (error) {
               throw new UnauthorizedException('Authentication error: Invalid token');
          }
     }
}
