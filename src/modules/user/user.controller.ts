import { Controller, Get, Res, Req, Post, Body } from '@nestjs/common'
import { Request, Response } from 'express'
import { UserService } from './user.service'

@Controller()
export class UserController {
     constructor(private userService: UserService) { }
     @Get('/get-profile')
     getProfile(@Req() req: Request, @Res() res: Response): Promise<any> {
          return this.userService.userProfile(req, res)
     }
     @Post('/register-user')
     registerUser(@Req() req: Request, @Res() res: Response, @Body() body: any): Promise<any> {
          return this.userService.userRegister(req, res, body)
     }
}
