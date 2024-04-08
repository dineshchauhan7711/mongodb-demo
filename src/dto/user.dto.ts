import { IsEmail, IsNumber, IsOptional, IsString, Min, } from 'class-validator';

export class RegiterUserDTO {
    @IsEmail({},
        { message: 'Please use valid email' }
    )
    email: string;
    @IsString()
    @Min(8, {
        message: "Please enter minimum 8 character and strong password."
    })
    password: string;

    @IsString()
    firstName: number;

    @IsString()
    lastName: number;

    getFirstErrorMessage(): string | undefined {
        const errors = Object.values(this);
        for (const error of errors) {
            if (Array.isArray(error) && error.length > 0) {
                return error[0];
            }
        }
        return undefined;
    }
}
