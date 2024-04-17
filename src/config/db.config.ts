import { Module, Global, OnApplicationBootstrap } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config'
import dbModels from "../model/index.model";
import mongoose from 'mongoose';

@Global()
@Module({
     imports: [
          ConfigModule.forRoot(),
          MongooseModule.forRootAsync({
               inject: [ConfigService],
               useFactory: async (configService: ConfigService) => ({
                    uri: configService.get<string>('mongoUrl'),
               }),
               imports: [ConfigModule],
          }),
          MongooseModule.forFeature(dbModels),
     ],
     exports: [MongooseModule]
})

export class DbModule implements OnApplicationBootstrap {
     constructor(
          private readonly configService: ConfigService
     ) { }
     async onApplicationBootstrap() {
          try {
               mongoose.connect(this.configService.get<string>('mongoUrl'))
                    .then(() => console.log('Database connected successfully'))
                    .catch((error) => console.log('Failed to establish MongoDB connection:', error));
          } catch (error) {
               console.log('Failed to establish MongoDB connection:', error);
               throw error;
          }
     }
};