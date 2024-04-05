import { User, UserSchema } from './user.model'
import { Post, PostSchema } from "./post.model";

export default [
     { name: User.name, schema: UserSchema },
     { name: Post.name, schema: PostSchema },
   ];