import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

import { IsOptionalNotNull } from '../decorator/IsOptionalNotNull';
import { LimitedMax } from '../decorator/LimitedMax';

export class PaginateFindHttpV1 {
  @ApiPropertyOptional()
  @IsOptionalNotNull()
  @IsInt()
  @Min(1)
  @LimitedMax(200)
  limit: number = 10;

  @ApiPropertyOptional()
  @IsOptionalNotNull()
  @IsInt()
  @Min(1)
  page: number = 1;
}
