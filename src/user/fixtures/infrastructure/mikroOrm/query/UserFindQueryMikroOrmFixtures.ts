import { ObjectQuery } from '@mikro-orm/core';

import { UserMikroOrm } from '../../../../infrastructure/mikroOrm/model/UserMikroOrm';

export class UserFindQueryMikroOrmFixtures {
  public static get any(): ObjectQuery<UserMikroOrm> {
    const userFindQueryMikroOrm: ObjectQuery<UserMikroOrm> = {};

    return userFindQueryMikroOrm;
  }
}
