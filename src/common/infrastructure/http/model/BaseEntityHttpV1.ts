import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export abstract class BaseEntityHttpV1 {
  @ApiProperty()
  public createdAt!: Date;

  @ApiProperty({ format: 'uuid' })
  public id!: string;

  @ApiPropertyOptional()
  public updatedAt?: Date;

  @ApiProperty({ format: 'uuid' })
  public createdById!: string;

  @ApiPropertyOptional({ format: 'uuid' })
  public updatedById?: string;

  @ApiProperty()
  public version!: number;
}
