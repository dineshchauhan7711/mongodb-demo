import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

// Modules
import { UserModule } from './user.module';
import { PostModule } from './post.module';

// //Middleware
import { AuthMiddleware } from 'src/middleware/auth/auth';
import { JwtService } from "../helper/jwt";

@Module({
     imports: [
          UserModule,
          PostModule
     ],
     providers: [JwtService],
})

export class IndexModule {
     configure(consumer: MiddlewareConsumer) {
          consumer
               .apply(AuthMiddleware)
               .exclude(
                    { path: 'login', method: RequestMethod.POST },
                    { path: 'register-user', method: RequestMethod.POST },
               )
               .forRoutes({ path: '*', method: RequestMethod.ALL });
     }
}
