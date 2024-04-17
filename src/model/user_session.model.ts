// user.entity.ts
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Schema as schema } from 'mongoose';
import { User } from "./user.model";

export type UserSessionDocument = UserSession & Document;

@Schema({
     toJSON: {
          getters: true,
          virtuals: true,
     },
     timestamps: true,
})

export class UserSession {

     @Prop({ required: true })
     token: string;

     @Prop({ type: schema.Types.ObjectId, ref: 'User' })
     User_id: User;
   
}

export const UserSessionSchema = SchemaFactory.createForClass(UserSession);


