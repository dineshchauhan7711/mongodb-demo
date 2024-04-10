import { Module } from '@nestjs/common';

// Modules
import { UserModule } from './user.module'
import { PostModule } from './post.module'

@Module({
     imports: [UserModule, PostModule],
})
export class IndexModule { }
