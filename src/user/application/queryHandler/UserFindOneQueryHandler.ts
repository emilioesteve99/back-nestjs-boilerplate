import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';

import { FindOneQueryHandler } from '../../../common/application/queryHandler/FindOneQueryHandler';
import { ManagerAsync } from '../../../common/domain/manager/ManagerAsync';
import { FindOneUserManager } from '../../domain/manager/FindOneUserManager';
import { User } from '../../domain/model/User';
import { UserFindOneQuery } from '../../domain/query/UserFindOneQuery';

@QueryHandler(UserFindOneQuery)
export class UserFindOneQueryHandler extends FindOneQueryHandler<UserFindOneQuery, User> {
  public constructor(
    @Inject(FindOneUserManager)
    findOneUserManager: ManagerAsync<UserFindOneQuery, User | undefined>,
  ) {
    super(findOneUserManager);
  }
}
