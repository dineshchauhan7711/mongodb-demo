// Modules
import { Injectable } from '@nestjs/common'
import { Request, Response } from 'express'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Helpers
import { successResponse, errorResponse } from '../helper/response';

// Models
import { Conversation, ConversationDocument } from "../model/chat_conversation";
import { Chat, ChatDocument } from "../model/chat.model";

@Injectable()
export class ChatService {
     @InjectModel('Chat') private ChatModel: Model<ChatDocument>;
     @InjectModel('Conversation') private ConversationModel: Model<ConversationDocument>;

     // Get chat
     async getChat(req: Request, res: Response, query: any): Promise<any> {
          try {
               const { user: { id }, query: { userId } } = req;
               const page = parseInt(query.page) || 1;
               const limit = parseInt(query.limit) || 15;
               const skip = (page - 1) * limit;

               // Find conversation
               let findConversation = await this.ConversationModel.findOne({
                    $or: [
                         {
                              senderId: id,
                              receiverId: userId as string
                         },
                         {
                              senderId: userId,
                              receiverId: id
                         }
                    ]
               });
               if (!findConversation) {
                    return errorResponse(res, 3002)
               };

               const totalChat = await this.ChatModel.countDocuments({ conversationId: findConversation._id })

               // Find chat
               const chatData = await this.ChatModel.find({ conversationId: findConversation._id })
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit);

               // Final response with pagination
               const response: any = {
                    pageInformation: {
                         totalRecord: totalChat,
                         currentPage: page,
                         lastPage: Math.ceil(totalChat / limit),
                         previousPage: page - 1,
                    },
                    pageData: chatData
               }
               return successResponse(res, 3001, response)
          } catch (error) {
               console.log('error :>> ', error);
               return errorResponse(res, 9999)
          }
     };

     // Get conversation users
     async getConversationUsers(req: Request, res: Response, query: any): Promise<any> {
          try {
               const { user: { id } } = req;
               const page = parseInt(query.page) || 1;
               const limit = parseInt(query.limit) || 15;
               const skip = (page - 1) * limit;

               let totalConversation = await this.ConversationModel.countDocuments({
                    $or: [
                         { senderId: id },
                         { receiverId: id }
                    ]
               });
               let findConversation = await this.ConversationModel.find({
                    $or: [
                         { senderId: id },
                         { receiverId: id }
                    ]
               })
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit);

               // Final response with pagination
               const response: any = {
                    pageInformation: {
                         totalRecord: totalConversation,
                         currentPage: page,
                         lastPage: Math.ceil(totalConversation / limit),
                         previousPage: page - 1,
                    },
                    pageData: findConversation
               }
               return successResponse(res, 3003, response)
          } catch (error) {
               console.log('error :>> ', error);
               return errorResponse(res, 9999)
          }
     };

}