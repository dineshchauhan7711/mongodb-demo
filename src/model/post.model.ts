// user.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Type } from 'class-transformer';
import { User } from "./user.model";

export type PostDocument = Post & Document;

@Schema({
     toJSON: {
          getters: true,
          virtuals: true,
     },
     timestamps: true,
})

export class Post {
     @Prop({
          type: String,
          unique: true,
          default: function genUUID() {
               return uuid();
          },
     })
     userId: string;

     @Prop({ required: true })
     post: string;

     @Prop({ required: true })
     post_type: boolean;

     @Type(() => User)
     User_id: User;


}

export const PostSchema = SchemaFactory.createForClass(Post);

