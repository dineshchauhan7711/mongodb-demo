import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';

// Socket Service
import { SocketAuthService } from "./socket.auth";

// Models
import { SocketId, SocketIdDocument } from "../model/user_socket_id.model";
import { Conversation, ConversationDocument } from "../model/chat_conversation";
import { Chat, ChatDocument } from "../model/chat.model";


interface CustomSocket extends Socket {
     user?: {
          id: string;
          socketId: string;
     }
}

@Injectable()
export class SocketService
     implements OnGatewayConnection, OnGatewayDisconnect {
     constructor(
          private readonly SocketAuthService: SocketAuthService
     ) { }
     @InjectModel('SocketId') private readonly SocketIdModel: Model<SocketIdDocument>;
     @InjectModel('Conversation') private readonly ConversationModel: Model<ConversationDocument>;
     @InjectModel('Chat') private readonly ChatModel: Model<ChatDocument>;
     // Connection events
     async handleConnection(socket: CustomSocket): Promise<void> {
          try {
               const authResponse = await this.SocketAuthService.authenticate(socket);
               if (!authResponse.success) {
                    socket.disconnect();
               };
          } catch (error) {
               throw new Error(error);
          }
     };

     // Disconnection events
     async handleDisconnect(socket: CustomSocket): Promise<void> {
          const clientId = socket.id;
          await this.SocketIdModel.deleteOne({ socketId: clientId });
          console.log('Socket Client disconnected ===:>> ', clientId);
     };

     async sendMessage(socket: CustomSocket, payload: any): Promise<any> {
          try {
               let findConversation = await this.ConversationModel.findOne({
                    $or: [
                         {
                              senderId: socket.user.id,
                              receiverId: payload.receiverId
                         },
                         {
                              senderId: payload.receiverId,
                              receiverId: socket.user.id
                         }
                    ]
               });
               if (!findConversation) {
                    findConversation = await this.ConversationModel.create({
                         senderId: socket.user.id,
                         receiverId: payload.receiverId
                    })
               };

               // Create chat
               const newChat = await this.ChatModel.create({
                    senderId: socket.user.id,
                    conversationId: findConversation._id,
                    message: payload.message
               });

               // Get Chat Data
               const chat = await this.ChatModel.findOne({
                    _id: newChat._id
               }).populate(
                    [
                         {
                              path: 'senderId',
                              select: 'firstName lastName profileImage'
                         }
                    ]
               );
               return chat
          } catch (error) {
               throw new Error(error);
          }
     };


};
