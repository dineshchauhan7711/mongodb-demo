import { User, UserSchema } from './user.model'
import { Post, PostSchema } from "./post.model";
import { UserSession, UserSessionSchema } from "./user_session.model";
import { SocketId, SocketIdSchema } from "./user_socket_id.model";
import { Chat, ChatSchema } from "./chat.model";
import { Conversation, ConversationSchema } from "./chat_conversation";

export default [
  { name: User.name, schema: UserSchema },
  { name: Post.name, schema: PostSchema },
  { name: UserSession.name, schema: UserSessionSchema },
  { name: SocketId.name, schema: SocketIdSchema },
  { name: Chat.name, schema: ChatSchema },
  { name: Conversation.name, schema: ConversationSchema },
];