import { UserMikroOrm } from '../../../../infrastructure/mikroOrm/model/UserMikroOrm';
import { UserFixtures } from '../../../domain/model/UserFixtures';

export class UserMikroOrmFixtures {
  public static get any(): UserMikroOrm {
    const userMikroOrm: UserMikroOrm = new UserMikroOrm();

    userMikroOrm.id = UserFixtures.any.id;
    userMikroOrm.createdAt = UserFixtures.any.createdAt;
    userMikroOrm.email = UserFixtures.any.email;
    userMikroOrm.name = UserFixtures.any.name;
    userMikroOrm.password = UserFixtures.any.password;

    return userMikroOrm;
  }
}
