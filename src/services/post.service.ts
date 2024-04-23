// Modules
import { Injectable } from '@nestjs/common'
import { Request, Response, query } from 'express'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Helpers
import { successResponse, errorResponse } from '../helper/response';
import { uploadFiles } from 'src/helper/file';

// Models
import { Post, PostDocument } from "../model/post.model";
import { User, UserDocument } from "../model/user.model";


@Injectable()
export class PostService {
     constructor(
          @InjectModel(Post.name) private PostModel: Model<PostDocument>,
          @InjectModel(User.name) private UserModel: Model<UserDocument>
     ) { }


     /**
      * Create Post
      */
     async createPost(req: Request, res: Response, body: any): Promise<any> {
          try {
               const { title, description } = body;
               const { user: { id }, files } = req;

               // If file not selected.
               if (!files.length) {
                    return errorResponse(res, 2004)
               };

               // Upload files on server
               const uploadResponse = await uploadFiles(files, 'post');
               if (!uploadResponse.success) {
                    return errorResponse(res, 1011)
               };

               // Create Post
               await this.PostModel.create({
                    title,
                    description,
                    postUrl: uploadResponse.fileName,
                    userId: id
               });

               return successResponse(res, 2001, null, 201)
          } catch (error) {
               console.log('error :>> ', error);
               return errorResponse(res, 9999)
          }
     };


     /**
      * Get user post
      */
     async getPosts(req: Request, res: Response, query: any): Promise<any> {
          try {
               const { user: { id } } = req;
               const page = query.page ? Number(query.page) : 1;
               const limit = query.limit ? Number(query.limit) : 15;
               const skip = (page - 1) * limit;

               // Total Posts
               const totalPosts = await this.PostModel.countDocuments({ userId: id });

               // Get user posts
               const posts = await this.PostModel.find({ userId: id })
                    .populate({
                         path: 'userId',
                         select: 'firstName lastName profileImage'
                    })
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit);

               // Final response with pagination
               const response: any = {
                    pageInformation: {
                         totalRecord: totalPosts,
                         currentPage: page,
                         lastPage: Math.ceil(totalPosts / limit),
                         previousPage: page - 1,
                    },
                    pageData: posts
               }
               return successResponse(res, 2002, response, 200)
          } catch (error) {
               console.log('error :>> ', error);
               return errorResponse(res, 9999)
          }
     }

     /**
      * Delete user post
      */
     async deletePosts(req: Request, res: Response, query: any): Promise<any> {
          try {
               const { user: { id } } = req;
               const { postId } = query;

               // Find user posts
               const post = await this.PostModel.findOne({ _id: postId, userId: id });
               if (!post) {
                    return errorResponse(res, 2005);
               };

               // Delete post
               await this.PostModel.deleteOne({ _id: postId });

               return successResponse(res, 2002);
          } catch (error) {
               console.log('error :>> ', error);
               return errorResponse(res, 9999)
          }
     }
}
