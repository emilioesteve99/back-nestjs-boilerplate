import { ObjectQuery } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';

import { UserFindQueryToUserFindQueryMikroOrmConverterAsync } from './UserFindQueryToUserFindQueryMikroOrmConverterAsync';
import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { AnyEntityPaginateFindQueryToAnyEntityFindQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/AnyEntityPaginateFindQueryToAnyEntityFindQueryMikroOrmConverterAsync';
import { UserFindQuery } from '../../../domain/query/UserFindQuery';
import { UserPaginateFindQuery } from '../../../domain/query/UserPaginateFindQuery';
import { UserMikroOrm } from '../model/UserMikroOrm';

@Injectable()
export class UserPaginateFindQueryToUserFindQueryMikroOrmConverterAsync extends AnyEntityPaginateFindQueryToAnyEntityFindQueryMikroOrmConverterAsync<
  UserPaginateFindQuery,
  ObjectQuery<UserMikroOrm>
> {
  public constructor(
    @Inject(UserFindQueryToUserFindQueryMikroOrmConverterAsync)
    userFindQueryToUserFindQueryMikroOrmConverterAsync: ConverterAsync<UserFindQuery, ObjectQuery<UserMikroOrm>>,
  ) {
    super(userFindQueryToUserFindQueryMikroOrmConverterAsync);
  }
}
