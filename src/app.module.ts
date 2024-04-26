import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { config } from './config/config'
import { IndexModule } from './router/index.modules';
import { DbModule } from "./config/db.config";
import { SocketModule } from "./socket/socket.module";
@Module({
     imports: [
          ConfigModule.forRoot({
               isGlobal: true,
               envFilePath: ['.env'],
               load: [config],
          }),
          DbModule,
          IndexModule,
          SocketModule
     ],
     exports: []
})
export class AppModule { }
