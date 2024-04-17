import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { config } from './config'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import {  ValidationPipe } from '@nestjs/common';
import { ValidationExceptionFilter } from "./helper/response";

async function bootstrap() {
     let app: any

     if (config.protocol === 'https') {
          app = await NestFactory.create(AppModule, {
               httpsOptions: {
                    key: readFileSync(config.sslCertificates.privkey),
                    cert: readFileSync(config.sslCertificates.fullchain),
               },
          })
     } else {
          app = await NestFactory.create(AppModule)
     }

     app.useGlobalPipes(
          new ValidationPipe({
               // exceptionFactory: (errors) => {
               //      const result = errors.map((error) => (
               //           error.constraints[Object.keys(error.constraints)[0]]
               //      ));
               //      return { success: false, message: result[0] };
               // },
               stopAtFirstError: true,
               validateCustomDecorators: true
          }),
     );
     app.useGlobalFilters(new ValidationExceptionFilter())
     app.setGlobalPrefix('api/v1');

     // Define the public folder to serve static files
     app.useStaticAssets(resolve(__dirname, '../public'))

     await app.listen(config.port, () => {
          console.log(`Application is running on: ${config.port}`)
     })
}

bootstrap()
