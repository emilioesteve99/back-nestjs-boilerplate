import { Entity, PrimaryKey } from '@mikro-orm/core';

import { BaseEntityMikroOrm } from '../../../../common/infrastructure/mikroOrm/model/BaseEntityMikroOrm';

@Entity({ tableName: 'user' })
export class UserMikroOrm extends BaseEntityMikroOrm {
  @PrimaryKey({ name: 'name', type: 'varchar' })
  name!: string;
}
