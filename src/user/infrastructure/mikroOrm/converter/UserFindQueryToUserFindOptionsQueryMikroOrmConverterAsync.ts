import { FindOptions, QueryOrderMap } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';

import { UserSortKeyAndOrderTypeArrayToUserQueryOrderMapMikroOrmArrayConverter } from './UserSortKeyAndOrderTypeArrayToUserQueryOrderMapMikroOrmArrayConverter';
import { Converter } from '../../../../common/domain/converter/Converter';
import { BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync';
import { BaseEntityMikroOrm } from '../../../../common/infrastructure/mikroOrm/model/BaseEntityMikroOrm';
import { UserSortKeyAndOrderType } from '../../../domain/model/UserSortKeyAndOrderType';
import { UserFindQuery } from '../../../domain/query/UserFindQuery';
import { UserMikroOrm } from '../model/UserMikroOrm';

@Injectable()
export class UserFindQueryToUserFindOptionsQueryMikroOrmConverterAsync extends BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync<
  UserFindQuery,
  FindOptions<UserMikroOrm>
> {
  public constructor(
    @Inject(UserSortKeyAndOrderTypeArrayToUserQueryOrderMapMikroOrmArrayConverter)
    userSortKeyAndOrderTypeArrayToUserQueryOrderMapMikroOrmArrayConverter: Converter<
      UserSortKeyAndOrderType[],
      QueryOrderMap<UserMikroOrm>[]
    >,
  ) {
    super(userSortKeyAndOrderTypeArrayToUserQueryOrderMapMikroOrmArrayConverter);
  }

  protected override async convertToSpecificEntityFindOptionsQueryMikroOrm(
    _input: UserFindQuery,
    baseEntityFindOptionsQueryMikroOrm: FindOptions<BaseEntityMikroOrm>,
  ): Promise<FindOptions<UserMikroOrm>> {
    const userFindOptionsQueryMikroOrm: FindOptions<UserMikroOrm> = {
      ...(baseEntityFindOptionsQueryMikroOrm as unknown as FindOptions<UserMikroOrm>),
    };

    return userFindOptionsQueryMikroOrm;
  }
}
