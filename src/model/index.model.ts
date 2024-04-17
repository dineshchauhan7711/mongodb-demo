import { User, UserSchema } from './user.model'
import { Post, PostSchema } from "./post.model";
import { UserSession, UserSessionSchema } from "./user_session.model";

export default [
  { name: User.name, schema: UserSchema },
  { name: Post.name, schema: PostSchema },
  { name: UserSession.name, schema: UserSessionSchema },
];