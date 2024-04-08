import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { config } from './config'
import { readFileSync } from 'fs'
import { resolve } from 'path'

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

     // app.setGlobalPrefix('api/v1');
     // Define the public folder to serve static files
     app.useStaticAssets(resolve(__dirname, '../public'))

     await app.listen(config.port, () => {
          console.log(`Application is running on: ${config.port}`)
     })
}

bootstrap()
