import { Injectable, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'

@Injectable()
export class PostService {
     async getPost(req: Request, res: Response): Promise<any> {
          try {
               console.log('req.ip :>> ', req.ip)
               console.log('========>Get Post')
               return res.send({
                    success: true,
                    message: 'Post get successfully',
               })
          } catch (error) {
               return res.send({ success: false, message: error })
          }
     }
}
