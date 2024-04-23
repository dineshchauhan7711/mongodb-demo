
import { Injectable, NestMiddleware, Header } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// //DTO
import { HeaderDTO } from "../../dto/auth.dto";

// Response
import { errorResponse } from '../../helper/response';

// Models
import { User, UserDocument } from "../../model/user.model";
import { UserSession, UserSessionDocument } from "../../model/user_session.model";
// JWT 
import { JwtService } from "../../helper/jwt";

declare global {
     namespace Express {
          interface Request {
               user: {
                    id: string;
               };
          }
     }
}


@Injectable()
export class AuthMiddleware implements NestMiddleware {
     constructor(
          // Models
          @InjectModel(User.name) private UserModel: Model<UserDocument>,
          @InjectModel(UserSession.name) private UserSessionModel: Model<UserSessionDocument>,
          // JWT
          private readonly jwtService: JwtService
     ) { }
     async use(req: Request, res: Response, next: NextFunction) {
          try {
               const headerToken = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

               // Validate the authorization header
               const dto = plainToClass(HeaderDTO, { authorization: headerToken });
               const errors = await validate(dto);
               if (errors.length > 0) {
                    return errorResponse(res, 1009)
               };

               // Verify token
               const tokenResponse = await this.jwtService.verifyJWTToken(headerToken);
               if (!tokenResponse.success) {
                    return errorResponse(res, 1009)
               };

               // Find authorization token
               const findAuth = await this.UserSessionModel.findOne({ token: headerToken });
               if (!findAuth) {
                    return errorResponse(res, 1009)
               };

               // Find user
               const findUser = await this.UserModel.findOne({ _id: findAuth.userId });
               if (!findUser) {
                    return errorResponse(res, 1009)
               };

               req.user = {
                    id: findUser._id
               }

               next();
          } catch (error) {
               console.log('error :>> ', error);
               return errorResponse(res, 9999)
          }
     }
}
