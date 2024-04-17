import { Controller, Get, Res, Req, Post, Body, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

// //Services
import { UserService } from '../services/user.service';

// //DTO
import { RegisterUserDTO, LoginDTO } from "../dto/user.dto";


@Controller()
export class UserController {
     constructor(
          private userService: UserService
     ) { }

     /**
      * Login
      */
     @Post('/login')
     login(@Req() req: Request, @Res() res: Response, @Body() body: LoginDTO): Promise<any> {
          return this.userService.login(req, res, body)
     };

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
