import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { config } from './config'
import { IndexModule } from './router/index.modules';


@Module({
     imports: [
          ConfigModule.forRoot(),
          MongooseModule.forRoot(config.mongoUrl),
          IndexModule,
     ],
})
export class AppModule { }
