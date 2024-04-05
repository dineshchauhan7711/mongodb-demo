import { Controller, Get, Res, Req } from '@nestjs/common'
import { Request, Response } from 'express'
import { UserService } from './user.service'

@Controller()
export class UserController {
     constructor(private userService: UserService) { }
     @Get('/get-profile')
     getProfile(@Req() req: Request, @Res() res: Response): Promise<any> {
          return this.userService.userProfile(req, res)
     }
}
