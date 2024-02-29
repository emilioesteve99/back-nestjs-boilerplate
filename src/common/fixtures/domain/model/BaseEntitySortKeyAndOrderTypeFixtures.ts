import { BaseEntitySortKeyAndOrderType } from '../../../domain/model/BaseEntitySortKeyAndOrderType';
import { OrderType } from '../../../domain/model/OrderType';

export class BaseEntitySortKeyAndOrderTypeFixtures {
  public static get any(): BaseEntitySortKeyAndOrderType {
    const baseEntitySortKeyAndOrderType: BaseEntitySortKeyAndOrderType = {};

    return baseEntitySortKeyAndOrderType;
  }

  public static get withCreatedAt(): BaseEntitySortKeyAndOrderType {
    const baseEntitySortKeyAndOrderType: BaseEntitySortKeyAndOrderType = {
      createdAt: OrderType.ASC,
    };

    return baseEntitySortKeyAndOrderType;
  }

  public static get withId(): BaseEntitySortKeyAndOrderType {
    const baseEntitySortKeyAndOrderType: BaseEntitySortKeyAndOrderType = {
      id: OrderType.ASC,
    };

    return baseEntitySortKeyAndOrderType;
  }

  public static get withUpdatedAt(): BaseEntitySortKeyAndOrderType {
    const baseEntitySortKeyAndOrderType: BaseEntitySortKeyAndOrderType = {
      updatedAt: OrderType.DESC,
    };

    return baseEntitySortKeyAndOrderType;
  }
}
