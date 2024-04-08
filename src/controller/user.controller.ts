import { Controller, Get, Res, Req, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common'
import { Request, Response } from 'express'

// Services
import { UserService } from '../services/user.service'
// DTO
import { RegiterUserDTO } from "../dto/user.dto";
@Controller()
export class UserController {
     constructor(private userService: UserService) { }
     @Get('/get-profile')
     getProfile(@Req() req: Request, @Res() res: Response): Promise<any> {
          return this.userService.userProfile(req, res)
     }
     @Post('/register-user')
     // @UsePipes(new ValidationPipe())

     registerUser(@Req() req: Request, @Res() res: Response, @Body() body: RegiterUserDTO): Promise<any> {
          return this.userService.userRegister(req, res, body)
     }
}
