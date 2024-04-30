// socket-auth.middleware.ts
import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { verify } from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Models
import { User, UserDocument } from "../model/user.model";
import { UserSession, UserSessionDocument } from "../model/user_session.model";
import { SocketId, SocketIdDocument } from "../model/user_socket_id.model";

interface CustomSocket extends Socket {
     user?: {
          id: string;
          socketId: string;
     }
}

@Injectable()
export class SocketAuthService {
     @InjectModel('User') private readonly UserModel: Model<UserDocument>;
     @InjectModel('UserSession') private readonly UserSessionModel: Model<UserSessionDocument>;
     @InjectModel('SocketId') private readonly SocketIdModel: Model<SocketIdDocument>;

     async authenticate(socket: CustomSocket): Promise<any> {
          if (!socket.handshake.headers.authorization) {
               return {
                    success: false,
                    message: 'Authentication error: Token missing'
               };
          }
          try {
               const token = socket.handshake.headers.authorization;

               // Verify token in JWT
               const decoded = verify(token, process.env.JWT_SECRET_KEY);
               if (!decoded) {
                    return {
                         success: false,
                         message: 'Authentication error: Invalid token'
                    }
               };

               // Find token from DB
               const findToken = await this.UserSessionModel.findOne({ token: token });
               if (!findToken) {
                    return {
                         success: false,
                         message: 'Authentication error: Invalid token'
                    }
               };

               // Verify user
               const findUser = await this.UserModel.findOne({ _id: findToken.userId }, '_id');
               if (!findUser) {
                    return {
                         success: false,
                         message: 'Authentication error: Invalid token'
                    }
               };

               // Add socket id to DB
               await this.SocketIdModel.create({ socketId: socket.id, userId: findUser._id });
               socket.user = {
                    id: findUser._id,
                    socketId: socket.id
               };
               return {
                    success: true,
               };
          } catch (error) {
               return {
                    success: false,
                    message: 'Authentication error: Invalid token'
               };
          }
     }
}
