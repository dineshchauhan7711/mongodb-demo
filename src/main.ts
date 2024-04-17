import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { resolve } from 'path'
import { ValidationPipe } from '@nestjs/common';
import { ValidationExceptionFilter } from "./helper/response";
import { ConfigService } from '@nestjs/config'
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
     const app = await NestFactory.create<NestExpressApplication>(AppModule)
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
     app.useStaticAssets(resolve(__dirname, '../public'))

     const configService = app.get(ConfigService);
     const port = configService.get<number>('port')
     await app.listen(port, () => {
          console.log(`Application is running on: ${port}`)
     })
}

bootstrap()
