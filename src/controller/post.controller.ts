// Modules
import { Controller, Get, Res, Req, Post, Body, Query, Delete } from '@nestjs/common'
import { Request, Response } from 'express';

// Services
import { PostService } from '../services/post.service'

// DTO
import { CreatePostDTO, GetPostDTO, DeletePostDTO } from '../dto/post.dto'

@Controller()
export class PostController {
     constructor(private PostService: PostService) { };

     /**
      * Create Post
      */
     @Post('/create-post')
     createPost(@Req() req: Request, @Res() res: Response, @Body() body: CreatePostDTO): Promise<any> {
          return this.PostService.createPost(req, res, body)
     };

     /**
      * Get user posts
      */
     @Get('/get-posts')
     getPosts(@Req() req: Request, @Res() res: Response, @Query() query: GetPostDTO): Promise<any> {
          return this.PostService.getPosts(req, res, query)
     };

     /**
      * Delete user posts
      */
     @Delete('/delete-post')
     deletePosts(@Req() req: Request, @Res() res: Response, @Query() query: DeletePostDTO): Promise<any> {
          return this.PostService.deletePosts(req, res, query)
     };



}
