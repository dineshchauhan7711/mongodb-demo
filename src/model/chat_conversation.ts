import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as schema } from 'mongoose';
import { User } from "./user.model";

export type ConversationDocument = Conversation & Document;

@Schema({
     toJSON: {
          getters: true,
          virtuals: true,
     },
     timestamps: true
})

export class Conversation {

     @Prop({ type: schema.Types.ObjectId, ref: 'User', required: true })
     receiverId: string;

     @Prop({ type: schema.Types.ObjectId, ref: 'User', required: true })
     senderId: User;

}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);


