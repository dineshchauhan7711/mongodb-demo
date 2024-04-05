import { Injectable } from '@nestjs/common'
import { Request, Response } from 'express'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Models
import { User, UserDocument } from "../../model/user.model";
import { Post, PostDocument } from "../../model/post.model"
@Injectable()
export class UserService {
     constructor(
          @InjectModel(User.name) private UserModel: Model<UserDocument>,
          @InjectModel(Post.name) private PostModel: Model<PostDocument>

     ) { }
     async userProfile(req: Request, res: Response): Promise<any> {
          try {
               const userData = await this.UserModel.find({}).populate('Posts');
               const post = await this.PostModel.find({});
               console.log('post :>> ', post);
               return res.send({
                    success: true,
                    message: 'Profile get successfully',
                    data: userData
               })
          } catch (error) {
               return res.send({ success: false, message: error })
          }
     };
     async userRegister(req: Request, res: Response, body: any): Promise<any> {
          try {
               console.log('body :>> ', body);
               const { lastName, firstName, email, password } = body;
               const userData = await this.UserModel.create({
                    firstName,
                    lastName,
                    email,
                    password
               })
               return res.send({
                    success: true,
                    message: 'Register successfully',
                    data: userData
               })
          } catch (error) {
               return res.send({ success: false, message: error })
          }
     }
}
