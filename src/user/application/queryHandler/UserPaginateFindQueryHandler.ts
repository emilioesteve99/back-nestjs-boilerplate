import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';

import { PaginateFindQueryHandler } from '../../../common/application/queryHandler/PaginateFindQueryHandler';
import { PaginateFindUserManager } from '../../domain/manager/PaginateFindUserManager';
import { User } from '../../domain/model/User';
import { UserPaginateFindQuery } from '../../domain/query/UserPaginateFindQuery';

@QueryHandler(UserPaginateFindQuery)
export class UserPaginateFindQueryHandler extends PaginateFindQueryHandler<UserPaginateFindQuery, User> {
  public constructor(
    @Inject(PaginateFindUserManager)
    paginateFindUserManager: PaginateFindUserManager,
  ) {
    super(paginateFindUserManager);
  }
}
