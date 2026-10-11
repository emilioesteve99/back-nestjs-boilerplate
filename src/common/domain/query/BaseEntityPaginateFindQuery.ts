import { PaginationOptions } from '../model/PaginationOptions';
import { BaseEntityFindQuery } from './BaseEntityFindQuery';

export interface BaseEntityPaginateFindQuery {
  findQuery: BaseEntityFindQuery;
  paginationOptions: PaginationOptions;
}
