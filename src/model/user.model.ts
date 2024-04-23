// Modules
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { hashSync } from "bcryptjs";

//Helper
import { getFilePath } from "../helper/file";

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  toObject: {
    getters: true,
  },
  timestamps: true
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
    set: (value: any) => hashSync(value, 10),
  })
  password: string;

  @Prop({
    required: false,
    default: null,
    get(value: any) {
      return value ? getFilePath(value, 'profileImages') : null;
    }
  })
  profileImage: string
}

export const UserSchema = SchemaFactory.createForClass(User);