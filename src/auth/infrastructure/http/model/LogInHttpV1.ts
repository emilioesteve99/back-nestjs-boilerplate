import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LogInHttpV1 {
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
