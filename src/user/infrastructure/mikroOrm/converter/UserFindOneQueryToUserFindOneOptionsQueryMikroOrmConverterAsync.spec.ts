import { FindOneOptions, QueryOrderMap } from '@mikro-orm/core';
import { Mocked } from 'vitest';

import { UserFindOneQueryToUserFindOneOptionsQueryMikroOrmConverterAsync } from './UserFindOneQueryToUserFindOneOptionsQueryMikroOrmConverterAsync';
import { Converter } from '../../../../common/domain/converter/Converter';
import { UserSortKeyAndOrderType } from '../../../domain/model/UserSortKeyAndOrderType';
import { UserFindOneQuery } from '../../../domain/query/UserFindOneQuery';
import { UserFindOneQueryFixtures } from '../../../fixtures/domain/query/UserFindOneQueryFixtures';
import { UserFindOneOptionsQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/query/UserFindOneOptionsQueryMikroOrmFixtures';
import { UserMikroOrm } from '../model/UserMikroOrm';

describe(UserFindOneQueryToUserFindOneOptionsQueryMikroOrmConverterAsync.name, () => {
  let userFindOneQueryToUserFindOneOptionsQueryMikroOrmConverterAsync: UserFindOneQueryToUserFindOneOptionsQueryMikroOrmConverterAsync;
  let userSortKeyAndOrderTypeArrayToUserQueryOrderMapMikroOrmArrayConverterMock: Mocked<
    Converter<UserSortKeyAndOrderType[], QueryOrderMap<UserMikroOrm>[]>
  >;

  beforeAll(() => {
    userSortKeyAndOrderTypeArrayToUserQueryOrderMapMikroOrmArrayConverterMock = {
      convert: vi.fn(),
    };

    userFindOneQueryToUserFindOneOptionsQueryMikroOrmConverterAsync =
      new UserFindOneQueryToUserFindOneOptionsQueryMikroOrmConverterAsync(
        userSortKeyAndOrderTypeArrayToUserQueryOrderMapMikroOrmArrayConverterMock,
      );
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let userFindOneQueryFixture: UserFindOneQuery;
      let userFindOneOptionsQueryMikroOrmFixture: FindOneOptions<UserMikroOrm>;
      let result: unknown;

      beforeAll(async () => {
        userFindOneQueryFixture = UserFindOneQueryFixtures.any;
        userFindOneOptionsQueryMikroOrmFixture = UserFindOneOptionsQueryMikroOrmFixtures.any;

        result = await userFindOneQueryToUserFindOneOptionsQueryMikroOrmConverterAsync.convert(userFindOneQueryFixture);
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should return a FindOneOptions<UserMikroOrm>', () => {
        expect(result).toStrictEqual(userFindOneOptionsQueryMikroOrmFixture);
      });
    });
  });
});
