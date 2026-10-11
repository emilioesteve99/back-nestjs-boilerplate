import { PaginationOptions } from '../model/PaginationOptions';
import { AnyEntityFindQuery } from './AnyEntityFindQuery';

export interface AnyEntityPaginateFindQuery {
  findQuery: AnyEntityFindQuery;
  paginationOptions: PaginationOptions;
}
