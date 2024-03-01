import { RequiredEntityData } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { BaseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsync';
import { BaseEntityMikroOrm } from '../../../../common/infrastructure/mikroOrm/model/BaseEntityMikroOrm';
import { UserInsertOneCommand } from '../../../domain/command/UserInsertOneCommand';
import { UserMikroOrm } from '../model/UserMikroOrm';

@Injectable()
export class UserInsertOneCommandToUserInsertOneQueryMikroOrmConverterAsync extends BaseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsync<
  UserInsertOneCommand,
  RequiredEntityData<UserMikroOrm>
> {
  public constructor() {
    super();
  }

  protected async convertToSpecificEntityInsertOneQueryMikroOrm(
    input: UserInsertOneCommand,
    baseEntityInsertOneQueryMikroOrm: RequiredEntityData<BaseEntityMikroOrm>,
  ): Promise<RequiredEntityData<UserMikroOrm>> {
    const userInsertOneQueryMikroOrm: RequiredEntityData<UserMikroOrm> = {
      ...baseEntityInsertOneQueryMikroOrm,
      email: input.email,
      name: input.name,
      password: input.password,
    };

    return userInsertOneQueryMikroOrm;
  }
}
