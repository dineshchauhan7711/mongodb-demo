import { Injectable } from '@nestjs/common'
import { Request, Response } from 'express'

@Injectable()
export class UserService {
     async userProfile(req: Request, res: Response): Promise<any> {
          try {
               console.log('req.ip :>> ', req.ip)
               console.log('========>Get Profile')
               return res.send({
                    success: true,
                    message: 'Profile get successfully',
               })
          } catch (error) {
               return res.send({ success: false, message: error })
          }
     }
}
