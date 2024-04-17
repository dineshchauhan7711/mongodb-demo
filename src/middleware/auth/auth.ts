
import { Injectable, NestMiddleware, Header } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
// //DTO
import { HeaderDTO } from "../../dto/auth.dto";

// Response
import { successResponse, errorResponse } from '../../helper/response';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
     async use(req: Request, res: Response, next: NextFunction) {
          try {
               // Validate the authorization header
               const dto = plainToClass(HeaderDTO, { authorization: req.headers.authorization });
               const errors = await validate(dto);
               if (errors.length > 0) {
                    console.log('errors :>> ', errors);
                    return errorResponse(res, 1009)
               };
               const headerToken = req.headers.authorization;

               // const isAuth = await UserSession.findOne({ token: headerToken });
               console.log('req.header.authorization :>> ', headerToken);
               
               next();
          } catch (error) {
               console.log('error :>> ', error);
               return errorResponse(res, 9999)
          }
     }
}
