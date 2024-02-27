import { UserFindQuery } from './UserFindQuery';
import { PaginationOptions } from '../../../common/domain/model/PaginationOptions';
import { BaseEntityPaginateFindQuery } from '../../../common/domain/query/BaseEntityPaginateFindQuery';

export class UserPaginateFindQuery implements BaseEntityPaginateFindQuery {
  public constructor(
    public readonly findQuery: UserFindQuery,
    public readonly paginationOptions: PaginationOptions,
  ) {}
}
