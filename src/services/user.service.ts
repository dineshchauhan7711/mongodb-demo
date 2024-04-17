//Modules
import { Injectable } from '@nestjs/common'
import { Request, Response } from 'express'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compareSync } from "bcryptjs";


// Models
import { User, UserDocument } from "../model/user.model";
import { Post, PostDocument } from "../model/post.model";


// Response
import { successResponse, errorResponse } from '../helper/response';

//Helper
import { generateJWTToken } from '../helper/jwt';

@Injectable()
export class UserService {
     constructor(
          @InjectModel(User.name) private UserModel: Model<UserDocument>,
          @InjectModel(Post.name) private PostModel: Model<PostDocument>

     ) { }


     /**
     * Login
     */
     async login(req: Request, res: Response, body: any): Promise<any> {
          try {
               const { password } = body;
               const email = (body.email).toLowerCase();

               // Check email
               const findUser = await this.UserModel.findOne({ email });
               if (!findUser) {
                    return errorResponse(res, 1005)
               };

               // Check password
               if (!compareSync(password, findUser.password)) {
                    return errorResponse(res, 1005)
               };

               // Generate JWT
               const tokenResponse = generateJWTToken({ payload: { _id: findUser._id, email: findUser.email } });
               if (!tokenResponse.success) {
                    return errorResponse(res, 1010)
               };

               let response = {
                    email: findUser.email,
                    token: tokenResponse.token
               }
               return successResponse(res, 1002, response)
          } catch (error) {
               console.log('error :>> ', error);
               return errorResponse(res, 9999)
          }
     }

     /**
      * userProfile
      */
     async userProfile(req: Request, res: Response): Promise<any> {
          try {
               const userData = await this.UserModel.find({});
               return successResponse(res, 1003, userData)
          } catch (error) {
               console.log('error :>> ', error);
               return errorResponse(res, 9999)
          }
     };

     /**
      * userRegister
      */
     async userRegister(req: Request, res: Response, body: any): Promise<any> {
          try {
               const { lastName, firstName, password } = body;
               const email = (body.email).toLowerCase();
               const findUser = await this.UserModel.findOne({ email });
               if (findUser) {
                    return errorResponse(res, 1004)
               }
               await this.UserModel.create({
                    firstName,
                    lastName,
                    email,
                    password
               })
               return successResponse(res, 1001, null, 201)
          } catch (error) {
               console.log('error :>> ', error);
               return errorResponse(res, 9999)
          }
     }
}
