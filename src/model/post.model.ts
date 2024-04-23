// Modules
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

//Helpers
import { getFilePath } from "../helper/file";

// Models
import { User } from "./user.model";

export type PostDocument = Post & Document;

@Schema({
     toJSON: {
          getters: true,
          virtuals: true,
     },
     timestamps: true
})

export class Post {

     @Prop({ required: false, default: null })
     title: string;

     @Prop({ required: false, default: null })
     description: string;

     @Prop({
          required: true,
          get(value: any) {
               return value ? getFilePath(value, 'post') : null;
          }
     })
     postUrl: string;

     @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name, required: true })
     userId: MongooseSchema.Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);

