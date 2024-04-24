import { IsString, IsNotEmpty, IsJWT } from 'class-validator';

/**
 * Header DTO
 */
export class HeaderDTO {

     /**
      * Token
      */
     @IsString()
     @IsNotEmpty({
          message: 'Token is required'
     })
     @IsJWT({
          message: "Token is invalid!"
     })
     authorization: string;

};