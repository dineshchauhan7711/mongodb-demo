import 'dotenv/config'

export const config: any = {
     port: process.env.PORT || 3000,
     mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/nest',
     protocol: process.env.PROTOCOL || 'http',
     sslCertificates: {
          fullchain:
               process.env.SSL_CERTIFICATES_FULLCHAIN || './fullchain.pem',
          privkey: process.env.SSL_CERTIFICATES_PRIVKEY || './privkey.pem',
     },
}
