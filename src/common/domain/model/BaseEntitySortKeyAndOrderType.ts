import { OrderType } from './OrderType';

export interface BaseEntitySortKeyAndOrderType {
  createdAt?: OrderType;
  id?: OrderType;
  updatedAt?: OrderType;
}
