import { randomUUID } from 'node:crypto';
import { OptionalProps } from '@mikro-orm/core';
import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/legacy';

type BaseEntityMikroOrmOptionalProps = 'createdAt' | 'updatedAt';

@Entity({ abstract: true })
export class BaseEntityMikroOrm {
  public [OptionalProps]?: BaseEntityMikroOrmOptionalProps;

  @Property({ length: 3, name: 'created_at', onCreate: () => new Date(), type: 'datetime' })
  public createdAt!: Date;

  @PrimaryKey({ name: 'id', type: 'uuid' })
  public id: string = randomUUID();

  @Property({ length: 3, name: 'updated_at', nullable: true, onUpdate: () => new Date(), type: 'datetime' })
  public updatedAt?: Date;
}
