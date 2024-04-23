import { Controller, Get, Res, Req, Post, Body, Patch, Delete } from '@nestjs/common';
import { Request, Response } from 'express';

// //Services
import { UserService } from '../services/user.service';

// //DTO
import { RegisterUserDTO, LoginDTO, UpdateUserDTO } from "../dto/user.dto";



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
     registerUser(@Req() req: Request, @Res() res: Response, @Body() body: RegisterUserDTO,): Promise<any> {
          return this.userService.userRegister(req, res, body,)
     };

     /**
      * Update User
      */
     @Patch('/update-user')
     updateUser(@Req() req: Request, @Res() res: Response, @Body() body: UpdateUserDTO,): Promise<any> {
          return this.userService.updateProfile(req, res, body)
     };

     /**
     * Logout User
     */
     @Delete('/logout')
     logout(@Req() req: Request, @Res() res: Response): Promise<any> {
          return this.userService.logout(req, res)
     };

}
