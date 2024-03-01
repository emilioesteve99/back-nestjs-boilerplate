import { FindOptions, QueryOrderMap } from '@mikro-orm/core';
import { Mocked } from 'vitest';

import { UserFindQueryToUserFindOptionsQueryMikroOrmConverterAsync } from './UserFindQueryToUserFindOptionsQueryMikroOrmConverterAsync';
import { Converter } from '../../../../common/domain/converter/Converter';
import { UserSortKeyAndOrderType } from '../../../domain/model/UserSortKeyAndOrderType';
import { UserFindQuery } from '../../../domain/query/UserFindQuery';
import { UserFindQueryFixtures } from '../../../fixtures/domain/query/UserFindQueryFixtures';
import { UserFindOptionsQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/query/UserFindOptionsQueryMikroOrmFixtures';
import { UserMikroOrm } from '../model/UserMikroOrm';

describe(UserFindQueryToUserFindOptionsQueryMikroOrmConverterAsync.name, () => {
  let userFindQueryToUserFindOptionsQueryMikroOrmConverterAsync: UserFindQueryToUserFindOptionsQueryMikroOrmConverterAsync;
  let userSortKeyAndOrderTypeArrayToUserQueryOrderMapMikroOrmArrayConverterMock: Mocked<
    Converter<UserSortKeyAndOrderType[], QueryOrderMap<UserMikroOrm>[]>
  >;

  beforeAll(() => {
    userSortKeyAndOrderTypeArrayToUserQueryOrderMapMikroOrmArrayConverterMock = {
      convert: vi.fn(),
    };

    userFindQueryToUserFindOptionsQueryMikroOrmConverterAsync =
      new UserFindQueryToUserFindOptionsQueryMikroOrmConverterAsync(
        userSortKeyAndOrderTypeArrayToUserQueryOrderMapMikroOrmArrayConverterMock,
      );
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let userFindQueryFixture: UserFindQuery;
      let userFindOptionsQueryMikroOrmFixture: FindOptions<UserMikroOrm>;
      let result: unknown;

      beforeAll(async () => {
        userFindQueryFixture = UserFindQueryFixtures.any;
        userFindOptionsQueryMikroOrmFixture = UserFindOptionsQueryMikroOrmFixtures.any;

        result = await userFindQueryToUserFindOptionsQueryMikroOrmConverterAsync.convert(userFindQueryFixture);
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should return a FindOptions<UserMikroOrm>', () => {
        expect(result).toStrictEqual(userFindOptionsQueryMikroOrmFixture);
      });
    });
  });
});
