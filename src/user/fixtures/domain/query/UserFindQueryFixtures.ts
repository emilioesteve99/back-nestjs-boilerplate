import { UserFindQuery } from '../../../domain/query/UserFindQuery';

export class UserFindQueryFixtures {
  public static get any(): UserFindQuery {
    const userFindQuery: UserFindQuery = new UserFindQuery({});

    return userFindQuery;
  }
}
