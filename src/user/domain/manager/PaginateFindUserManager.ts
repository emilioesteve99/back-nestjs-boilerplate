import { Inject, Injectable } from '@nestjs/common';

import { PaginateFindAdapter } from '../../../common/domain/adapter/PaginateFindAdapter';
import { PaginateFindManager } from '../../../common/domain/manager/PaginateFindManager';
import { PaginateFindUserMikroOrmAdapter } from '../../infrastructure/mikroOrm/adapter/PaginateFindUserMikroOrmAdapter';
import { User } from '../model/User';
import { UserPaginateFindQuery } from '../query/UserPaginateFindQuery';

@Injectable()
export class PaginateFindUserManager extends PaginateFindManager<UserPaginateFindQuery, User> {
  public constructor(
    @Inject(PaginateFindUserMikroOrmAdapter)
    paginateFindUserMikroOrmAdapter: PaginateFindAdapter<UserPaginateFindQuery, User>,
  ) {
    super(paginateFindUserMikroOrmAdapter);
  }
}
