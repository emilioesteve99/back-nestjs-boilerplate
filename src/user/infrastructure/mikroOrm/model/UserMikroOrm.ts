import { Entity, Property, Unique } from '@mikro-orm/core';

import { BaseEntityMikroOrm } from '../../../../common/infrastructure/mikroOrm/model/BaseEntityMikroOrm';

@Entity({ tableName: 'user' })
@Unique({ properties: ['email'] })
export class UserMikroOrm extends BaseEntityMikroOrm {
  @Property({ name: 'email', type: 'varchar' })
  email!: string;

  @Property({ name: 'name', type: 'varchar' })
  name!: string;

  @Property({ name: 'password', type: 'varchar' })
  password!: string;
}
