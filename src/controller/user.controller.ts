import { Controller, Get, Res, Req, Post, Body } from '@nestjs/common';
import { Request, Response } from 'express';

// Services
import { UserService } from '../services/user.service';

// DTO
import { RegisterUserDTO } from "../dto/user.dto";

@Controller()
export class UserController {
     constructor(private userService: UserService) { }

     /**
      * Get User Profile
      */
     @Get('/get-profile')
     getProfile(@Req() req: Request, @Res() res: Response): Promise<any> {
          return this.userService.userProfile(req, res)
     };

     /**
      * Register User
      */
     @Post('/register-user')
     registerUser(@Req() req: Request, @Res() res: Response, @Body() body: RegisterUserDTO): Promise<any> {
          return this.userService.userRegister(req, res, body)
     };


}
