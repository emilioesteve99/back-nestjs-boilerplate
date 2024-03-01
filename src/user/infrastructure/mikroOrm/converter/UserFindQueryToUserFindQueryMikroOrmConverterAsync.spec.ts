import { ObjectQuery } from '@mikro-orm/core';

import { UserFindQueryToUserFindQueryMikroOrmConverterAsync } from './UserFindQueryToUserFindQueryMikroOrmConverterAsync';
import { UserFindQuery } from '../../../domain/query/UserFindQuery';
import { UserFindQueryFixtures } from '../../../fixtures/domain/query/UserFindQueryFixtures';
import { UserFindQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/query/UserFindQueryMikroOrmFixtures';
import { UserMikroOrm } from '../model/UserMikroOrm';

describe(UserFindQueryToUserFindQueryMikroOrmConverterAsync.name, () => {
  let userFindQueryToUserFindQueryMikroOrmConverterAsync: UserFindQueryToUserFindQueryMikroOrmConverterAsync;

  beforeAll(() => {
    userFindQueryToUserFindQueryMikroOrmConverterAsync = new UserFindQueryToUserFindQueryMikroOrmConverterAsync();
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let userFindQueryFixture: UserFindQuery;
      let userFindQueryMikroOrmFixture: ObjectQuery<UserMikroOrm>;
      let result: unknown;

      beforeAll(async () => {
        userFindQueryFixture = UserFindQueryFixtures.any;
        userFindQueryMikroOrmFixture = UserFindQueryMikroOrmFixtures.any;

        result = await userFindQueryToUserFindQueryMikroOrmConverterAsync.convert(userFindQueryFixture);
      });

      it('should return a ObjectQuery<UserMikroOrm>', () => {
        expect(result).toStrictEqual(userFindQueryMikroOrmFixture);
      });
    });
  });
});
