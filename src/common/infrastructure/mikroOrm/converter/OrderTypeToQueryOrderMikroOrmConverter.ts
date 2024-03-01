import { QueryOrder } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { Converter } from '../../../domain/converter/Converter';
import { OrderType } from '../../../domain/model/OrderType';

@Injectable()
export class OrderTypeToQueryOrderMikroOrmConverter implements Converter<OrderType, QueryOrder> {
  private readonly orderTypeQueryOrderMap: Map<OrderType, QueryOrder> = new Map([
    [OrderType.ASC, QueryOrder.ASC],
    [OrderType.ASC_NULLS_FIRST, QueryOrder.ASC_NULLS_FIRST],
    [OrderType.ASC_NULLS_LAST, QueryOrder.ASC_NULLS_LAST],
    [OrderType.DESC, QueryOrder.DESC],
    [OrderType.DESC_NULLS_FIRST, QueryOrder.DESC_NULLS_FIRST],
    [OrderType.DESC_NULLS_LAST, QueryOrder.DESC_NULLS_LAST],
  ]);

  public convert(input: OrderType): QueryOrder {
    const queryOrder: QueryOrder = this.orderTypeQueryOrderMap.get(input)!;

    return queryOrder;
  }
}
