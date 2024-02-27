import { EntityRepository, FindOptions, ObjectQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { FindMikroOrmAdapter } from '../../../../common/infrastructure/mikroOrm/adapter/FindMikroOrmAdapter';
import { User } from '../../../domain/model/User';
import { UserFindQuery } from '../../../domain/query/UserFindQuery';
import { UserFindQueryToUserFindOptionsQueryMikroOrmConverterAsync } from '../converter/UserFindQueryToUserFindOptionsQueryMikroOrmConverterAsync';
import { UserFindQueryToUserFindQueryMikroOrmConverterAsync } from '../converter/UserFindQueryToUserFindQueryMikroOrmConverterAsync';
import { UserMikroOrmToUserConverterAsync } from '../converter/UserMikroOrmToUserConverterAsync';
import { UserMikroOrm } from '../model/UserMikroOrm';

@Injectable()
export class FindUserMikroOrmAdapter extends FindMikroOrmAdapter<UserFindQuery, UserMikroOrm, User> {
  public constructor(
    @InjectRepository(UserMikroOrm) userCourtMikroOrmRepository: EntityRepository<UserMikroOrm>,
    @Inject(UserFindQueryToUserFindQueryMikroOrmConverterAsync)
    userCourtFindQueryToPuserCourtFindQueryMikroOrmConverterAsync: ConverterAsync<
      UserFindQuery,
      ObjectQuery<UserMikroOrm>
    >,
    @Inject(UserFindQueryToUserFindOptionsQueryMikroOrmConverterAsync)
    userCourtFindQueryToPuserCourtFindOptionsQueryMikroOrmConverterAsync: ConverterAsync<
      UserFindQuery,
      FindOptions<UserMikroOrm>
    >,
    @Inject(UserMikroOrmToUserConverterAsync)
    userCourtMikroOrmToPuserCourtConverterAsync: ConverterAsync<UserMikroOrm, User>,
  ) {
    super(
      userCourtMikroOrmRepository,
      userCourtFindQueryToPuserCourtFindQueryMikroOrmConverterAsync,
      userCourtFindQueryToPuserCourtFindOptionsQueryMikroOrmConverterAsync,
      userCourtMikroOrmToPuserCourtConverterAsync,
    );
  }
}
