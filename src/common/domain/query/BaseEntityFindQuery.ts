import { IQuery } from '@nestjs/cqrs';

import { BaseEntitySortKeyAndOrderType } from '../model/BaseEntitySortKeyAndOrderType';

export interface BaseEntityFindQuery extends IQuery {
  ids: string[] | undefined;
  sortKeyAndOrderTypes: BaseEntitySortKeyAndOrderType[] | undefined;
}
