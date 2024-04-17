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
     timestamps: {
          createdAt: 'created_at',
          updatedAt: 'updated_at'
     },
})

export class UserSession {

     @Prop({ required: true })
     token: string;

     @Prop({ type: schema.Types.ObjectId, ref: 'User', required: true })
     user_id: User;

}

export const UserSessionSchema = SchemaFactory.createForClass(UserSession);


