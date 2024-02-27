import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export abstract class BaseEntityHttpV1 {
  @ApiProperty()
  createdAt!: Date;

  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiPropertyOptional()
  updatedAt?: Date;

  @ApiProperty({ format: 'uuid' })
  createdById!: string;

  @ApiPropertyOptional({ format: 'uuid' })
  updatedById?: string;

  @ApiProperty()
  version!: number;
}
