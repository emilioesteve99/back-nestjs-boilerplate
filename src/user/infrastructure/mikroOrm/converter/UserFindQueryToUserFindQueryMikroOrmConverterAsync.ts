import { ObjectQuery } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { BaseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync';
import { BaseEntityMikroOrm } from '../../../../common/infrastructure/mikroOrm/model/BaseEntityMikroOrm';
import { UserFindQuery } from '../../../domain/query/UserFindQuery';
import { UserMikroOrm } from '../model/UserMikroOrm';

@Injectable()
export class UserFindQueryToUserFindQueryMikroOrmConverterAsync extends BaseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync<
  UserFindQuery,
  ObjectQuery<UserMikroOrm>
> {
  protected override async convertToSpecificEntityFindQueryMikroOrm(
    input: UserFindQuery,
    baseEntityFindQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm>,
  ): Promise<ObjectQuery<UserMikroOrm>> {
    const userFindQueryMikroOrm: ObjectQuery<UserMikroOrm> = {
      ...(baseEntityFindQueryMikroOrm as ObjectQuery<UserMikroOrm>),
    };

    if (input.email !== undefined) {
      userFindQueryMikroOrm.email = input.email;
    }

    return userFindQueryMikroOrm;
  }
}
