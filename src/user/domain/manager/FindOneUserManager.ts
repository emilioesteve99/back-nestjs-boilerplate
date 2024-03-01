import { Inject, Injectable } from '@nestjs/common';

import { FindOneAdapter } from '../../../common/domain/adapter/FindOneAdapter';
import { FindOneManager } from '../../../common/domain/manager/FindOneManager';
import { FindOneUserMikroOrmAdapter } from '../../infrastructure/mikroOrm/adapter/FindOneUserMikroOrmAdapter';
import { User } from '../model/User';
import { UserFindOneQuery } from '../query/UserFindOneQuery';

@Injectable()
export class FindOneUserManager extends FindOneManager<UserFindOneQuery, User> {
  public constructor(
    @Inject(FindOneUserMikroOrmAdapter)
    findOneUserMikroOrmAdapter: FindOneAdapter<UserFindOneQuery, User>,
  ) {
    super(findOneUserMikroOrmAdapter);
  }
}
