import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import dbModule from "../../model/index.model";
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
     imports: [MongooseModule.forFeature(dbModule)],
     controllers: [UserController],
     providers: [UserService],
})
export class UserModule { }
