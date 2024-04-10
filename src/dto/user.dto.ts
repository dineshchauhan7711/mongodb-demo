import { IsEmail, IsString, MinLength, IsNotEmpty, ValidateIf } from 'class-validator';



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
    firstName: number;


    /**
     * lastName
     */
    @IsString()
    @IsNotEmpty({
        message: 'LastName is required'
    })
    lastName: number;


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
     * email
     */
    email?: string;

    /**
     * password
     */
    password?: string;


    /**
     * current password
     */
    @IsString({
        message: 'Current password is required'
    })
    // @IsNotEmpty({
    //     message: 'Current password is required'
    // })
    @ValidateIf((object, value) => object.password !== undefined)
    currentPassword: string;

};










