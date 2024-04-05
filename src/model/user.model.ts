// user.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Post } from "./post.model";

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})

export class User {

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false })
  clientId?: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('Posts', {
  ref: Post.name,
  localField: '_id',
  foreignField: 'user_id',
  justOne: false,
});