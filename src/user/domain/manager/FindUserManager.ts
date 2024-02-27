import { Inject, Injectable } from '@nestjs/common';

import { FindAdapter } from '../../../common/domain/adapter/FindAdapter';
import { FindManager } from '../../../common/domain/manager/FindManager';
import { FindUserMikroOrmAdapter } from '../../infrastructure/mikroOrm/adapter/FindUserMikroOrmAdapter';
import { User } from '../model/User';
import { UserFindQuery } from '../query/UserFindQuery';

@Injectable()
export class FindUserManager extends FindManager<UserFindQuery, User> {
  public constructor(@Inject(FindUserMikroOrmAdapter) findUserMikroOrmAdapter: FindAdapter<UserFindQuery, User>) {
    super(findUserMikroOrmAdapter);
  }
}
