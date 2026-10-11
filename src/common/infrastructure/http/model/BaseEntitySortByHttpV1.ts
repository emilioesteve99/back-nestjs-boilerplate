import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

import { BaseEntitySortKeyAndOrderType } from '../../../domain/model/BaseEntitySortKeyAndOrderType';
import { OrderType } from '../../../domain/model/OrderType';
import { IsOptionalNotNull } from '../decorator/IsOptionalNotNull';

export class BaseEntitySortByHttpV1 implements BaseEntitySortKeyAndOrderType {
  @ApiPropertyOptional({ enum: OrderType, enumName: 'OrderType' })
  @IsOptionalNotNull()
  @IsEnum(OrderType)
  public createdAt?: OrderType;

  @ApiPropertyOptional({ enum: OrderType, enumName: 'OrderType' })
  @IsOptionalNotNull()
  @IsEnum(OrderType)
  public createdById?: OrderType;

  @ApiPropertyOptional({ enum: OrderType, enumName: 'OrderType' })
  @IsOptionalNotNull()
  @IsEnum(OrderType)
  public id?: OrderType;

  @ApiPropertyOptional({ enum: OrderType, enumName: 'OrderType' })
  @IsOptionalNotNull()
  @IsEnum(OrderType)
  public updatedAt?: OrderType;

  @ApiPropertyOptional({ enum: OrderType, enumName: 'OrderType' })
  @IsOptionalNotNull()
  @IsEnum(OrderType)
  public updatedById?: OrderType;
}
