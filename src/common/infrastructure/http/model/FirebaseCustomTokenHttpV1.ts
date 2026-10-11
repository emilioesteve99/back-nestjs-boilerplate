import { ApiProperty } from '@nestjs/swagger';

export abstract class FirebaseCustomTokenHttpV1 {
  @ApiProperty()
  public customToken!: string;
}
