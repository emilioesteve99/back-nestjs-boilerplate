import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class InsertOneUserHttpV1 {
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 0,
    minUppercase: 1,
  })
  password!: string;
}
