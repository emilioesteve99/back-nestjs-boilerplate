import { QueryOrderMap } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';

import { UserSortKeyAndOrderTypeToUserQueryOrderMapMikroOrmConverter } from './UserSortKeyAndOrderTypeToUserQueryOrderMapMikroOrmConverter';
import { Converter } from '../../../../common/domain/converter/Converter';
import { BaseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverter } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverter';
import { UserSortKeyAndOrderType } from '../../../domain/model/UserSortKeyAndOrderType';
import { UserMikroOrm } from '../model/UserMikroOrm';

@Injectable()
export class UserSortKeyAndOrderTypeArrayToUserQueryOrderMapMikroOrmArrayConverter extends BaseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverter<
  UserSortKeyAndOrderType[],
  QueryOrderMap<UserMikroOrm>[]
> {
  public constructor(
    @Inject(UserSortKeyAndOrderTypeToUserQueryOrderMapMikroOrmConverter)
    userSortKeyAndOrderTypeToUserQueryOrderMapMikroOrmConverter: Converter<
      UserSortKeyAndOrderType,
      QueryOrderMap<UserMikroOrm>
    >,
  ) {
    super(userSortKeyAndOrderTypeToUserQueryOrderMapMikroOrmConverter);
  }
}
