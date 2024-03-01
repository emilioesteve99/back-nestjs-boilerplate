import { RequiredEntityData } from '@mikro-orm/core';

import { UserMikroOrm } from '../../../../infrastructure/mikroOrm/model/UserMikroOrm';
import { UserFixtures } from '../../../domain/model/UserFixtures';

export class UserInsertOneQueryMikroOrmFixtures {
  public static get any(): RequiredEntityData<UserMikroOrm> {
    const userInsertOneQueryMikroOrm: RequiredEntityData<UserMikroOrm> = {
      email: UserFixtures.any.email,
      name: UserFixtures.any.name,
      password: UserFixtures.any.password,
    };

    return userInsertOneQueryMikroOrm;
  }
}
