import { IQuery } from '@nestjs/cqrs';

import { BaseEntitySortKeyAndOrderType } from '../model/BaseEntitySortKeyAndOrderType';

export interface BaseEntityFindOneQuery extends IQuery {
  ids: string[] | undefined;
  sortKeyAndOrderTypes: BaseEntitySortKeyAndOrderType[] | undefined;
}
