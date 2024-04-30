import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as schema } from 'mongoose';
import { User } from "./user.model";

export type ChatDocument = Chat & Document;

@Schema({
     toJSON: {
          getters: true,
          virtuals: true,
     },
     timestamps: true
})

export class Chat {

     @Prop({ type: schema.Types.ObjectId, ref: 'User', required: true })
     conversationId: string;

     @Prop({ type: schema.Types.ObjectId, ref: 'User', required: true })
     senderId: User;

     @Prop({ required: true })
     message: string;

}

export const ChatSchema = SchemaFactory.createForClass(Chat);


