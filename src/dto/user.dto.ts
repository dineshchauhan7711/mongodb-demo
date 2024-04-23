import { IsEmail, IsString, MinLength, IsNotEmpty, ValidateIf, IsObject, IsNotEmptyObject } from 'class-validator';



/**
 * Register User DTO
 */
export class RegisterUserDTO {
    /**
     * firstName
     */
    @IsString()
    @IsNotEmpty({
        message: 'FirstName is required'
    })
    firstName: string;


    /**
     * lastName
     */
    @IsString()
    @IsNotEmpty({
        message: 'LastName is required'
    })
    lastName: string;


    /**
     * email
     */
    @IsEmail({},
        { message: 'Please use valid email' }
    )
    @IsNotEmpty({
        message: 'Email is required'
    })
    email: string;


    /**
     * password
     */
    @IsString()
    @MinLength(8, {
        message: "Please enter minimum 8 character and strong password."
    })
    @IsNotEmpty({
        message: 'Password is required'
    })
    password: string;

};

/**
 * Register User DTO
 */
export class LoginDTO {
    /**
     * email
     */
    @IsEmail({},
        { message: 'Please use valid email' }
    )
    @IsNotEmpty({
        message: 'Email is required'
    })
    email: string;


    /**
     * password
     */
    @IsString()
    @MinLength(8, {
        message: "Please enter minimum 8 character and strong password."
    })
    @IsNotEmpty({
        message: 'Password is required'
    })
    password: string;

};


/**
 * Update User DTO
 */
export class UpdateUserDTO {
    /**
     * firstName
     */
    firstName?: string;

    /**
     * lastName
     */
    lastName?: string;

    /**
     * new password
     */
    newPassword?: string;

    /**
     * current password
     */
    @IsString({
        message: 'Current password must be a string'
    })
    @IsNotEmpty({
        message: 'Current password is required'
    })
    @ValidateIf((object, value) => object.newPassword !== undefined)
    currentPassword?: string;

};










