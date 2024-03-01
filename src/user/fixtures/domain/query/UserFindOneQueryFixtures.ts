import { UserFindOneQuery } from '../../../domain/query/UserFindOneQuery';

export class UserFindOneQueryFixtures {
  public static get any(): UserFindOneQuery {
    const userFindOneQuery: UserFindOneQuery = new UserFindOneQuery({});

    return userFindOneQuery;
  }
}
