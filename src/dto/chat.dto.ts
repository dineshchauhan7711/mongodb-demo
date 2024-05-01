import { IsString, IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

/**
 * Chat DTO
 */
export class GetChatDTO {

     /**
      * User Id
      */
     @IsString()
     @IsNotEmpty({
          message: 'UserId is required'
     })
     userId: string;

     /**
      * Page
      */
     @IsNumberString()
     @IsOptional()
     page: string;

     /**
      * Limit 
      */
     @IsNumberString()
     @IsOptional()
     limit: string;

};
/**
 * Chat DTO
 */
export class GetConversationDTO {

     
     /**
      * Page
      */
     @IsNumberString()
     @IsOptional()
     page: string;

     /**
      * Limit 
      */
     @IsNumberString()
     @IsOptional()
     limit: string;

};