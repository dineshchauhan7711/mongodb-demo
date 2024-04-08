import { Controller, Get, Res, Req } from '@nestjs/common'
import { Request, Response } from 'express'
import { PostService } from '../services/post.service'

@Controller()
export class PostController {
     constructor(private PostService: PostService) { }
     @Get('/get-post')
     getPost(@Req() req: Request, @Res() res: Response): Promise<any> {
          return this.PostService.getPost(req, res)
     }
}
