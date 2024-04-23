import { IsString, IsNumberString, IsOptional, IsMongoId, IsNotEmpty } from 'class-validator';



/**
 * Create Post DTO
 */
export class CreatePostDTO {

     /**
      * title
      */
     @IsString()
     @IsOptional()
     title: string;

     /**
      * description 
      */
     @IsString()
     @IsOptional()
     description: string;
};


/**
 * Get Post DTO
 */
export class GetPostDTO {
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
 * Delete Post DTO
 */
export class DeletePostDTO {
     /**
      * Post Id
      */
     // @IsMongoId()
     postId: string;

};
