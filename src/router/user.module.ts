import { Module } from '@nestjs/common';

import { UserController } from '../controller/user.controller'
import { UserService } from '../services/user.service'

import { JwtService } from "../helper/jwt";
@Module({
     controllers: [UserController],
     providers: [UserService, JwtService],
})
export class UserModule { }
