import { RequiredEntityData } from '@mikro-orm/core';
import { BaseEntityMikroOrm } from '../../../../infrastructure/mikroOrm/model/BaseEntityMikroOrm';
import { BaseEntityInsertOneQueryMikroOrmFixtures } from './BaseEntityInsertOneQueryMikroOrmFixtures';

export class BaseEntityInsertQueryMikroOrmFixtures {
  public static get any(): RequiredEntityData<BaseEntityMikroOrm>[] {
    const baseEntityInsertQueryMikroOrm: RequiredEntityData<BaseEntityMikroOrm>[] = [];

    return baseEntityInsertQueryMikroOrm;
  }

  public static get withBaseEntityInsertOneQueryMikroOrm(): RequiredEntityData<BaseEntityMikroOrm>[] {
    const baseEntityInsertQueryMikroOrm: RequiredEntityData<BaseEntityMikroOrm>[] = [
      ...BaseEntityInsertQueryMikroOrmFixtures.any,
      BaseEntityInsertOneQueryMikroOrmFixtures.any,
    ];

    return baseEntityInsertQueryMikroOrm;
  }
}
