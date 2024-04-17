import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { sign, verify } from "jsonwebtoken";


@Injectable()
export class JwtService {
     constructor(
          private readonly configService: ConfigService
     ) {
          
      }

     /**
      * Generate JWT token (Algorithm HS256)
      */
     async generateJWTToken(object: { payload: object, expiry_time?: string }) {
          const secretKey = this.configService.get<string>('jwt.secret_key');
          let response: { success: boolean, token: string } = {
               success: false,
               token: null
          };
          try {
               const token = sign(object.payload, secretKey, { ...(object.expiry_time) && { expiresIn: object.expiry_time } });

               response = {
                    success: true,
                    token
               };
          } catch (error) {
               console.log('error in createJWTToken :>> ', error);
               response.success = false;
          } finally {
               return response;
          }
     };

     /**
     * Verify JWT token (Algorithm HS256)
     */
     async verifyJWTToken(token: string) {
          let response: { success: boolean, data: any } = {
               success: false,
               data: null
          };
          try {
               const secretKey = this.configService.get<string>('jwt.secret_key');
               const data = verify(token, secretKey);
               response.success = true;
               response.data = data;
          } catch (error) {
               console.log('error in verifyJWTToken :>> ', error);
               response.success = false;
          } finally {
               return response;
          }
     };
};