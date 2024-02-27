import { Injectable } from '@nestjs/common';

import { BaseEntity } from '../../../../common/domain/model/BaseEntity';
import { BaseEntityMikroOrmToBaseEntityConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntityMikroOrmToBaseEntityConverterAsync';
import { User } from '../../../domain/model/User';
import { UserMikroOrm } from '../model/UserMikroOrm';

@Injectable()
export class UserMikroOrmToUserConverterAsync extends BaseEntityMikroOrmToBaseEntityConverterAsync<UserMikroOrm, User> {
  protected async convertToSpecificEntity(input: UserMikroOrm, baseEntity: BaseEntity): Promise<User> {
    const user: User = {
      ...baseEntity,
      name: input.name,
    };

    return user;
  }
}
