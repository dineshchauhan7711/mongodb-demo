// Modules
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { hashSync } from "bcryptjs";

//Models
import { Post } from "./post.model";

// Config
import { config } from "../config";

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

  @Prop({ required: true, set: (value: any) => value.toLowerCase() })
  email: string;

  @Prop({
    required: true,
    set: (value: any) => hashSync(value, Number(config.bcryptJsSaltRounds)),
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('Posts', {
  ref: Post.name,
  localField: '_id',
  foreignField: 'user_id',
  justOne: false,
});