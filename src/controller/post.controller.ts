import { Controller, Get, Res, Req, UseGuards } from '@nestjs/common'
import { Request, Response } from 'express'
import { PostService } from '../services/post.service'
// import { AuthMiddleware } from 'src/middleware/auth/auth'

@Controller()
export class PostController {
     constructor(private PostService: PostService) { };

     /**
      * Get Post
      */
     @Get('/get-post')
     // @UseGuards(AuthMiddleware)
     getPost(@Req() req: Request, @Res() res: Response): Promise<any> {
          return this.PostService.getPost(req, res)
     };



}
