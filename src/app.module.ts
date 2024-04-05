import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { RouterModule } from "@nestjs/core";
import { ConfigModule } from '@nestjs/config'
import { config } from './config'
import { IndexModule } from './index.modules'

@Module({
     imports: [
          ConfigModule.forRoot(),
          MongooseModule.forRoot(config.mongoUrl),
          IndexModule,
          RouterModule.register([
               {
                    path: 'api/v1',
                    module: IndexModule
               }
          ])
     ],
})
export class AppModule { }
