import { IsEmail, IsNotEmpty, IsDefined, MinLength, MaxLength } from "class-validator";

export class RegisterUserDto {
    @IsNotEmpty()
    @IsDefined()
    @MaxLength(50)
    name!: string;

    @IsEmail()
    @IsDefined()
    email!: string;

    @IsDefined()
    @MinLength(8)
    @MaxLength(20)
    password!: string;
}
