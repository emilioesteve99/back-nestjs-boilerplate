import { OrderType } from '../../../domain/model/OrderType';

export class OrderTypeFixtures {
  public static get ASC(): OrderType {
    const orderType: OrderType = OrderType.ASC;

    return orderType;
  }
}
