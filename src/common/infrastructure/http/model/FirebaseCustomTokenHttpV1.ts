import { ApiProperty } from '@nestjs/swagger';

export abstract class FirebaseCustomTokenHttpV1 {
  @ApiProperty()
  customToken!: string;
}
