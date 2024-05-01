import { Controller, Get, Res, Req, Query } from '@nestjs/common';
import { Request, Response, query } from 'express';

// //Services
import { ChatService } from '../services/chat.service';

// Chat DTO
import { GetChatDTO, GetConversationDTO } from '../dto/chat.dto';



@Controller()
export class ChatController {
     constructor(
          private chatService: ChatService
     ) { }

     /**
      * Get chat users
      */
     @Get('/get-chat-users')
     getChatUsers(@Req() req: Request, @Res() res: Response, @Query() query: GetConversationDTO): Promise<any> {
          return this.chatService.getConversationUsers(req, res, query)
     };

     /**
      * Get chat
      */
     @Get('/get-chat')
     getChat(@Req() req: Request, @Res() res: Response, @Query() query: GetChatDTO): Promise<any> {
          return this.chatService.getChat(req, res, query)
     };



}
