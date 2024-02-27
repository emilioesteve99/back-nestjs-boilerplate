import { OrderType } from '../../../../domain/model/OrderType';
import { BaseEntitySortByHttpV1 } from '../BaseEntitySortByHttpV1';

export class BaseEntityHttpV1SwaggerExamples {
  public static get sortBy(): BaseEntitySortByHttpV1[] {
    const sortBy: BaseEntitySortByHttpV1[] = [
      { createdAt: OrderType.ASC },
      { createdById: OrderType.ASC },
      { id: OrderType.ASC },
      { updatedAt: OrderType.ASC },
      { updatedById: OrderType.ASC },
    ];

    return sortBy;
  }
}
