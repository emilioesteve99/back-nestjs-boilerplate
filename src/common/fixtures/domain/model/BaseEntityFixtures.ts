import { BaseEntity } from '../../../domain/model/BaseEntity';
import { DateFixtures } from './DateFixtures';

export class BaseEntityFixtures {
  public static get any(): BaseEntity {
    const baseEntity: BaseEntity = {
      createdAt: DateFixtures.createdAt,
      id: 'base-entity-id-example',
      updatedAt: undefined,
    };

    return baseEntity;
  }

  public static get withUpdatedAtAndUpdatedById(): BaseEntity {
    const baseEntity: BaseEntity = {
      createdAt: DateFixtures.createdAt,
      id: 'base-entity-id-example',
      updatedAt: DateFixtures.updatedAt,
    };

    return baseEntity;
  }
}
