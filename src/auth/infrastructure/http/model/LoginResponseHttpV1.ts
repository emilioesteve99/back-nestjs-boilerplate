import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseHttpV1 {
  @ApiProperty({ description: 'Bearer token' })
  token!: string;
}
