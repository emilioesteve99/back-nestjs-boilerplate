import { FindOptions } from '@mikro-orm/core';

import { UserMikroOrm } from '../../../../infrastructure/mikroOrm/model/UserMikroOrm';

export class UserFindOptionsQueryMikroOrmFixtures {
  public static get any(): FindOptions<UserMikroOrm> {
    const userFindOptionsQueryMikroOrm: FindOptions<UserMikroOrm> = {};

    return userFindOptionsQueryMikroOrm;
  }
}
