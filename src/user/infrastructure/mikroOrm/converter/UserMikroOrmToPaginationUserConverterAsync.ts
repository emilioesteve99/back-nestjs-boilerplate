import { Inject, Injectable } from '@nestjs/common';

import { UserMikroOrmToUserConverterAsync } from './UserMikroOrmToUserConverterAsync';
import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { Pagination } from '../../../../common/domain/model/Pagination';
import { AnyEntityMikroOrmToPaginationEntityConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/AnyEntityMikroOrmToPaginationEntityConverterAsync';
import { User } from '../../../domain/model/User';
import { UserMikroOrm } from '../model/UserMikroOrm';

@Injectable()
export class UserMikroOrmToPaginationUserConverterAsync extends AnyEntityMikroOrmToPaginationEntityConverterAsync<
  UserMikroOrm[],
  Pagination<User>
> {
  public constructor(
    @Inject(UserMikroOrmToUserConverterAsync)
    userMikroOrmToUserConverterAsync: ConverterAsync<UserMikroOrm, User>,
  ) {
    super(userMikroOrmToUserConverterAsync);
  }
}
