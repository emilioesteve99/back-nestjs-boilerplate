import { EntityRepository, FindOneOptions, ObjectQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { FindOneMikroOrmAdapter } from '../../../../common/infrastructure/mikroOrm/adapter/FindOneMikroOrmAdapter';
import { User } from '../../../domain/model/User';
import { UserFindOneQuery } from '../../../domain/query/UserFindOneQuery';
import { UserFindOneQueryToUserFindOneOptionsQueryMikroOrmConverterAsync } from '../converter/UserFindOneQueryToUserFindOneOptionsQueryMikroOrmConverterAsync';
import { UserFindQueryToUserFindQueryMikroOrmConverterAsync } from '../converter/UserFindQueryToUserFindQueryMikroOrmConverterAsync';
import { UserMikroOrmToUserConverterAsync } from '../converter/UserMikroOrmToUserConverterAsync';
import { UserMikroOrm } from '../model/UserMikroOrm';

@Injectable()
export class FindOneUserMikroOrmAdapter extends FindOneMikroOrmAdapter<UserFindOneQuery, User, UserMikroOrm> {
  public constructor(
    @InjectRepository(UserMikroOrm)
    userMikroOrmRepository: EntityRepository<UserMikroOrm>,
    @Inject(UserFindQueryToUserFindQueryMikroOrmConverterAsync)
    userFindOneQueryToUserFindOneQueryMikroOrmConverterAsync: ConverterAsync<
      UserFindOneQuery,
      ObjectQuery<UserMikroOrm>
    >,
    @Inject(UserFindOneQueryToUserFindOneOptionsQueryMikroOrmConverterAsync)
    userFindOneQueryToUserFindOneOptionsQueryMikroOrmConverterAsync: ConverterAsync<
      UserFindOneQuery,
      FindOneOptions<UserMikroOrm>
    >,
    @Inject(UserMikroOrmToUserConverterAsync)
    userMikroOrmToUserConverterAsync: ConverterAsync<UserMikroOrm, User>,
  ) {
    super(
      userMikroOrmRepository,
      userFindOneQueryToUserFindOneQueryMikroOrmConverterAsync,
      userFindOneQueryToUserFindOneOptionsQueryMikroOrmConverterAsync,
      userMikroOrmToUserConverterAsync,
    );
  }
}
