import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

import { BaseEntitySortKeyAndOrderType } from '../../../domain/model/BaseEntitySortKeyAndOrderType';
import { OrderType } from '../../../domain/model/OrderType';
import { IsOptionalNotNull } from '../decorator/IsOptionalNotNull';

export class BaseEntitySortByHttpV1 implements BaseEntitySortKeyAndOrderType {
  @ApiPropertyOptional({ enum: OrderType, enumName: 'OrderType' })
  @IsOptionalNotNull()
  @IsEnum(OrderType)
  createdAt?: OrderType;

  @ApiPropertyOptional({ enum: OrderType, enumName: 'OrderType' })
  @IsOptionalNotNull()
  @IsEnum(OrderType)
  createdById?: OrderType;

  @ApiPropertyOptional({ enum: OrderType, enumName: 'OrderType' })
  @IsOptionalNotNull()
  @IsEnum(OrderType)
  id?: OrderType;

  @ApiPropertyOptional({ enum: OrderType, enumName: 'OrderType' })
  @IsOptionalNotNull()
  @IsEnum(OrderType)
  updatedAt?: OrderType;

  @ApiPropertyOptional({ enum: OrderType, enumName: 'OrderType' })
  @IsOptionalNotNull()
  @IsEnum(OrderType)
  updatedById?: OrderType;
}
