import { QueryOrder } from '@mikro-orm/core';

export class QueryOrderMikroOrmFixtures {
  public static get ASC(): QueryOrder {
    const queryOrderMikroOrm: QueryOrder = QueryOrder.ASC;

    return queryOrderMikroOrm;
  }
}
