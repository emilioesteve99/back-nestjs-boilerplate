import { FindOneOptions, QueryOrderMap } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';

import { UserSortKeyAndOrderTypeArrayToUserQueryOrderMapMikroOrmArrayConverter } from './UserSortKeyAndOrderTypeArrayToUserQueryOrderMapMikroOrmArrayConverter';
import { Converter } from '../../../../common/domain/converter/Converter';
import { BaseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsync';
import { BaseEntityMikroOrm } from '../../../../common/infrastructure/mikroOrm/model/BaseEntityMikroOrm';
import { UserSortKeyAndOrderType } from '../../../domain/model/UserSortKeyAndOrderType';
import { UserFindOneQuery } from '../../../domain/query/UserFindOneQuery';
import { UserMikroOrm } from '../model/UserMikroOrm';

@Injectable()
export class UserFindOneQueryToUserFindOneOptionsQueryMikroOrmConverterAsync extends BaseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsync<
  UserFindOneQuery,
  FindOneOptions<UserMikroOrm>
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

  protected override async convertToSpecificEntityFindOneOptionsQueryMikroOrm(
    _input: UserFindOneQuery,
    baseEntityFindOneOptionsQueryMikroOrm: FindOneOptions<BaseEntityMikroOrm>,
  ): Promise<FindOneOptions<UserMikroOrm>> {
    const userFindOneOptionsQueryMikroOrm: FindOneOptions<UserMikroOrm> = {
      ...(baseEntityFindOneOptionsQueryMikroOrm as unknown as FindOneOptions<UserMikroOrm>),
    };

    return userFindOneOptionsQueryMikroOrm;
  }
}
