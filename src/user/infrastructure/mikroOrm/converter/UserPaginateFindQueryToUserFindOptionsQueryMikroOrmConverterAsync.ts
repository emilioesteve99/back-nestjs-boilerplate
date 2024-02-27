import { FindOptions } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';

import { UserFindQueryToUserFindOptionsQueryMikroOrmConverterAsync } from './UserFindQueryToUserFindOptionsQueryMikroOrmConverterAsync';
import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { AnyEntityPaginateFindQueryToAnyEntityFindOptionsQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/AnyEntityPaginateFindQueryToAnyEntityFindOptionsQueryMikroOrmConverterAsync';
import { UserFindQuery } from '../../../domain/query/UserFindQuery';
import { UserPaginateFindQuery } from '../../../domain/query/UserPaginateFindQuery';
import { UserMikroOrm } from '../model/UserMikroOrm';

@Injectable()
export class UserPaginateFindQueryToUserFindOptionsQueryMikroOrmConverterAsync extends AnyEntityPaginateFindQueryToAnyEntityFindOptionsQueryMikroOrmConverterAsync<
  UserPaginateFindQuery,
  FindOptions<UserMikroOrm>
> {
  public constructor(
    @Inject(UserFindQueryToUserFindOptionsQueryMikroOrmConverterAsync)
    userFindQueryToUserFindOptionsQueryMikroOrmConverterAsync: ConverterAsync<UserFindQuery, FindOptions<UserMikroOrm>>,
  ) {
    super(userFindQueryToUserFindOptionsQueryMikroOrmConverterAsync);
  }
}
