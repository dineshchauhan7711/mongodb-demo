import { Module } from '@nestjs/common';

// Modules
import { UserModule } from './user/user.module'
import { PostModule } from './post/post.module'

@Module({
     imports: [UserModule, PostModule],
})
export class IndexModule { }
