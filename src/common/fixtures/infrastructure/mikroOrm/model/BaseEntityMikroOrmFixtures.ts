import { BaseEntityMikroOrm } from '../../../../infrastructure/mikroOrm/model/BaseEntityMikroOrm';
import { BaseEntityFixtures } from '../../../domain/model/BaseEntityFixtures';

export class BaseEntityMikroOrmFixtures {
  public static get any(): BaseEntityMikroOrm {
    const baseEntityMikroOrm: BaseEntityMikroOrm = new BaseEntityMikroOrm();

    baseEntityMikroOrm.createdAt = BaseEntityFixtures.any.createdAt;
    baseEntityMikroOrm.id = BaseEntityFixtures.any.id;

    return baseEntityMikroOrm;
  }

  public static get withUpdatedAtAndUpdatedBy(): BaseEntityMikroOrm {
    const baseEntityMikroOrm: BaseEntityMikroOrm = new BaseEntityMikroOrm();

    baseEntityMikroOrm.createdAt = BaseEntityFixtures.withUpdatedAtAndUpdatedById.createdAt;
    baseEntityMikroOrm.id = BaseEntityFixtures.withUpdatedAtAndUpdatedById.id;
    baseEntityMikroOrm.updatedAt = BaseEntityFixtures.withUpdatedAtAndUpdatedById.updatedAt!;

    return baseEntityMikroOrm;
  }
}
