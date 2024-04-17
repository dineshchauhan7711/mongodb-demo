import { IsString, MinLength, IsNotEmpty } from 'class-validator';

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
     authorization: string;

};