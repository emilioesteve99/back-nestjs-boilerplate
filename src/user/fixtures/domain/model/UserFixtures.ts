import { DateFixtures } from '../../../../common/fixtures/domain/model/DateFixtures';
import { User } from '../../../domain/model/User';

export class UserFixtures {
  public static get any(): User {
    const user: User = {
      createdAt: DateFixtures.createdAt,
      email: 'email@example.com',
      id: 'id-example',
      name: 'name-example',
      password: 'password-example',
      updatedAt: undefined,
    };

    return user;
  }
}
