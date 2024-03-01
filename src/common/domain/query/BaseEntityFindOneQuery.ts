import { AnyEntityFindOneQuery } from './AnyEntityFindOneQuery';
import { BaseEntitySortKeyAndOrderType } from '../model/BaseEntitySortKeyAndOrderType';

export interface BaseEntityFindOneQuery extends AnyEntityFindOneQuery {
  ids: string[] | undefined;
  sortKeyAndOrderTypes: BaseEntitySortKeyAndOrderType[] | undefined;
}
