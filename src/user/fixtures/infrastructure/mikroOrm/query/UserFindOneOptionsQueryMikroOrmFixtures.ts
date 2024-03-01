import { FindOneOptions } from '@mikro-orm/core';

import { UserMikroOrm } from '../../../../infrastructure/mikroOrm/model/UserMikroOrm';

export class UserFindOneOptionsQueryMikroOrmFixtures {
  public static get any(): FindOneOptions<UserMikroOrm> {
    const userFindOneOptionsQueryMikroOrm: FindOneOptions<UserMikroOrm> = {};

    return userFindOneOptionsQueryMikroOrm;
  }
}
