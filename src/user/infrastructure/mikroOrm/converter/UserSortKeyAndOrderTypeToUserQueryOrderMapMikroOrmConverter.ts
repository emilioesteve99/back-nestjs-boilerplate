import { QueryOrder, QueryOrderMap } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/converter/Converter';
import { OrderType } from '../../../../common/domain/model/OrderType';
import { BaseEntitySortKeyAndOrderTypeToBaseEntityQueryOrderMapMikroOrmConverter } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntitySortKeyAndOrderTypeToBaseEntityQueryOrderMapMikroOrmConverter';
import { OrderTypeToQueryOrderMikroOrmConverter } from '../../../../common/infrastructure/mikroOrm/converter/OrderTypeToQueryOrderMikroOrmConverter';
import { BaseEntityMikroOrm } from '../../../../common/infrastructure/mikroOrm/model/BaseEntityMikroOrm';
import { UserSortKeyAndOrderType } from '../../../domain/model/UserSortKeyAndOrderType';
import { UserMikroOrm } from '../model/UserMikroOrm';

@Injectable()
export class UserSortKeyAndOrderTypeToUserQueryOrderMapMikroOrmConverter extends BaseEntitySortKeyAndOrderTypeToBaseEntityQueryOrderMapMikroOrmConverter<
  UserSortKeyAndOrderType,
  QueryOrderMap<UserMikroOrm>
> {
  public constructor(
    @Inject(OrderTypeToQueryOrderMikroOrmConverter)
    orderTypeToQueryOrderMikroOrmConverter: Converter<OrderType, QueryOrder>,
  ) {
    super(orderTypeToQueryOrderMikroOrmConverter);
  }

  protected convertToSpecificEntityQueryOrderMapMikroOrm(
    _input: UserSortKeyAndOrderType,
    baseEntityQueryOrderMapMikroOrm: QueryOrderMap<BaseEntityMikroOrm>,
  ): QueryOrderMap<UserMikroOrm> {
    const userQueryOrderMapMikroOrm: QueryOrderMap<UserMikroOrm> = {
      ...baseEntityQueryOrderMapMikroOrm,
    };

    return userQueryOrderMapMikroOrm;
  }
}
