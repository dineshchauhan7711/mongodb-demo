import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as schema } from 'mongoose';
import { User } from "./user.model";

export type SocketIdDocument = SocketId & Document;

@Schema({
     toJSON: {
          getters: true,
          virtuals: true,
     },
     timestamps: true
})

export class SocketId {

     @Prop({ required: true })
     socketId: string;

     @Prop({ type: schema.Types.ObjectId, ref: 'User', required: true })
     userId: User;

}

export const SocketIdSchema = SchemaFactory.createForClass(SocketId);


