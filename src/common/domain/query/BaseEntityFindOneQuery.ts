import { BaseEntitySortKeyAndOrderType } from '../model/BaseEntitySortKeyAndOrderType';
import { AnyEntityFindOneQuery } from './AnyEntityFindOneQuery';

export interface BaseEntityFindOneQuery extends AnyEntityFindOneQuery {
  ids: string[] | undefined;
  sortKeyAndOrderTypes: BaseEntitySortKeyAndOrderType[] | undefined;
}
