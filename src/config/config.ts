export const config = () => ({
     port: process.env.PORT || 3000,
     mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/nest',
     protocol: process.env.PROTOCOL || 'http',
     bcryptJsSaltRounds: process.env.BCRYPT_JS_SALT_ROUNDS || 10,
     jwt: {
          secret_key: process.env.JWT_SECRET_KEY || 'AWDSRHYCSS15ADD4DF5LOPA457',
          // expiry_time: process.env.JWT_EXPIRY_TIME || '1h'
     },
     projectPath: process.env.PROJECT_PATH || 'http://localhost:3000',
});
