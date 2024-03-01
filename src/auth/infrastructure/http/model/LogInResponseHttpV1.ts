import { ApiProperty } from '@nestjs/swagger';

export class LogInResponseHttpV1 {
  @ApiProperty({ description: 'Bearer token' })
  token!: string;
}
