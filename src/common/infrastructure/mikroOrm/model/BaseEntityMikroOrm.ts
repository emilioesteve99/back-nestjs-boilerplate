import { randomUUID } from 'crypto';

import { Entity, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';

type BaseEntityMikroOrmOptionalProps = 'createdAt';

@Entity({ abstract: true })
export class BaseEntityMikroOrm {
  [OptionalProps]?: BaseEntityMikroOrmOptionalProps;

  @Property({ length: 3, name: 'created_at', onCreate: () => new Date(), type: 'datetime' })
  createdAt!: Date;

  @PrimaryKey({ name: 'id', type: 'uuid' })
  id: string = randomUUID();
}
