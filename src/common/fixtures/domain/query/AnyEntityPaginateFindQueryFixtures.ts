import { AnyEntityPaginateFindQuery } from '../../../domain/query/AnyEntityPaginateFindQuery';
import { AnyEntityFindQueryFixtures } from './AnyEntityFindQueryFixtures';

export class AnyEntityPaginateFindQueryFixtures {
  public static get any(): AnyEntityPaginateFindQuery {
    const anyEntityPaginateFindQuery: AnyEntityPaginateFindQuery = {
      findQuery: AnyEntityFindQueryFixtures.any,
      paginationOptions: { limit: 10, page: 1 },
    };

    return anyEntityPaginateFindQuery;
  }
}
