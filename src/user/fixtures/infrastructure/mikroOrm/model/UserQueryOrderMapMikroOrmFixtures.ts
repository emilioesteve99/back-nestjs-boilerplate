import { QueryOrderMap } from '@mikro-orm/core';

import { UserMikroOrm } from '../../../../infrastructure/mikroOrm/model/UserMikroOrm';

export class UserQueryOrderMapMikroOrmFixtures {
  public static get any(): QueryOrderMap<UserMikroOrm> {
    const queryOrderMap: QueryOrderMap<UserMikroOrm> = {};

    return queryOrderMap;
  }
}
