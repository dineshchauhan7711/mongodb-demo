import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { config } from './config/config'
import { IndexModule } from './router/index.modules';
import { DbModule } from "./config/db.config";

@Module({
     imports: [
          ConfigModule.forRoot({
               isGlobal: true,
               envFilePath: ['.env'],
               load: [config],
          }),
          DbModule,
          IndexModule,
     ],
     exports: []
})
export class AppModule { }
