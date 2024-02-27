import { EntityRepository, FindOptions, ObjectQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { Pagination } from '../../../../common/domain/model/Pagination';
import { PaginateFindMikroOrmAdapter } from '../../../../common/infrastructure/mikroOrm/adapter/PaginateFindMikroOrmAdapter';
import { User } from '../../../domain/model/User';
import { UserPaginateFindQuery } from '../../../domain/query/UserPaginateFindQuery';
import { UserMikroOrmToPaginationUserConverterAsync } from '../converter/UserMikroOrmToPaginationUserConverterAsync';
import { UserPaginateFindQueryToUserFindOptionsQueryMikroOrmConverterAsync } from '../converter/UserPaginateFindQueryToUserFindOptionsQueryMikroOrmConverterAsync';
import { UserPaginateFindQueryToUserFindQueryMikroOrmConverterAsync } from '../converter/UserPaginateFindQueryToUserFindQueryMikroOrmConverterAsync';
import { UserMikroOrm } from '../model/UserMikroOrm';

@Injectable()
export class PaginateFindUserMikroOrmAdapter extends PaginateFindMikroOrmAdapter<
  UserPaginateFindQuery,
  UserMikroOrm,
  User
> {
  public constructor(
    @InjectRepository(UserMikroOrm)
    userMikroOrmRepository: EntityRepository<UserMikroOrm>,
    @Inject(UserPaginateFindQueryToUserFindQueryMikroOrmConverterAsync)
    userPaginateFindQueryToUserFindQueryMikroOrmConverterAsync: ConverterAsync<
      UserPaginateFindQuery,
      ObjectQuery<UserMikroOrm>
    >,
    @Inject(UserPaginateFindQueryToUserFindOptionsQueryMikroOrmConverterAsync)
    userPaginateFindQueryToUserFindOptionsQueryMikroOrmConverterAsync: ConverterAsync<
      UserPaginateFindQuery,
      FindOptions<UserMikroOrm>
    >,
    @Inject(UserMikroOrmToPaginationUserConverterAsync)
    userMikroOrmToPaginationUserConverterAsync: ConverterAsync<
      UserMikroOrm[],
      Pagination<User>,
      { query: UserPaginateFindQuery; totalItems: number }
    >,
  ) {
    super(
      userMikroOrmRepository,
      userPaginateFindQueryToUserFindQueryMikroOrmConverterAsync,
      userPaginateFindQueryToUserFindOptionsQueryMikroOrmConverterAsync,
      userMikroOrmToPaginationUserConverterAsync,
    );
  }
}
