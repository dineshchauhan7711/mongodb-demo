import { IsString, MinLength, IsNotEmpty,IsJWT,isJWT } from 'class-validator';

/**
 * Header DTO
 */
export class HeaderDTO {

     /**
      * Token
      */
     @IsString()
     // @MinLength(99, {
     //      message: "Token is invalid!"
     // })
     @IsNotEmpty({
          message: 'Token is required'
     })
     @IsJWT({
          message: "Token is invalid!"
     })
     authorization: string;

};