import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { resolve } from 'path'
import { ValidationPipe } from '@nestjs/common';
import { ValidationExceptionFilter } from "./helper/response";
import { ConfigService } from '@nestjs/config'
import { NestExpressApplication } from '@nestjs/platform-express';
import * as multer from 'multer';
import { SocketAuthMiddleware } from './socket/socket.auth';
// import { SocketAdapter } from 'socket.io';

async function bootstrap() {
     const app = await NestFactory.create<NestExpressApplication>(AppModule)
     const configService = app.get(ConfigService);

     // For validation
     app.useGlobalPipes(
          new ValidationPipe({
               stopAtFirstError: true,
               validateCustomDecorators: true
          }),
     );

     // Add global filters
     app.useGlobalFilters(new ValidationExceptionFilter());

     // Set global prefix
     app.setGlobalPrefix('api/v1');

     // Define the public folder to serve static files
     app.useStaticAssets(resolve(__dirname, '../public'));

     // Define the multer middleware
     app.use(multer().any());

     // app.useWebSocketAdapter(new SocketAdapter(app));
     app.use(SocketAuthMiddleware);
     const port = configService.get<number>('port')
     await app.listen(port, () => {
          console.log(`Application is running on: ${port}`)
     });
}

bootstrap()
