import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginHttpV1 {
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
