import { QueryOrder, QueryOrderMap } from '@mikro-orm/core';
import { Mocked } from 'vitest';

import { UserSortKeyAndOrderTypeToUserQueryOrderMapMikroOrmConverter } from './UserSortKeyAndOrderTypeToUserQueryOrderMapMikroOrmConverter';
import { Converter } from '../../../../common/domain/converter/Converter';
import { OrderType } from '../../../../common/domain/model/OrderType';
import { UserSortKeyAndOrderType } from '../../../domain/model/UserSortKeyAndOrderType';
import { UserSortKeyAndOrderTypeFixtures } from '../../../fixtures/domain/model/UserSortKeyAndOrderTypeFixtures';
import { UserQueryOrderMapMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/model/UserQueryOrderMapMikroOrmFixtures';
import { UserMikroOrm } from '../model/UserMikroOrm';

describe(UserSortKeyAndOrderTypeToUserQueryOrderMapMikroOrmConverter.name, () => {
  let orderTypeToQueryOrderMikroOrmConverterMock: Mocked<Converter<OrderType, QueryOrder>>;
  let userSortKeyAndOrderTypeToUserQueryOrderMapMikroOrmConverter: UserSortKeyAndOrderTypeToUserQueryOrderMapMikroOrmConverter;

  beforeAll(() => {
    orderTypeToQueryOrderMikroOrmConverterMock = {
      convert: vi.fn(),
    };

    userSortKeyAndOrderTypeToUserQueryOrderMapMikroOrmConverter =
      new UserSortKeyAndOrderTypeToUserQueryOrderMapMikroOrmConverter(orderTypeToQueryOrderMikroOrmConverterMock);
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let userSortKeyAndOrderTypeFixture: UserSortKeyAndOrderType;
      let userQueryOrderMapMikroOrmFixture: QueryOrderMap<UserMikroOrm>;
      let result: unknown;

      beforeAll(() => {
        userSortKeyAndOrderTypeFixture = UserSortKeyAndOrderTypeFixtures.any;
        userQueryOrderMapMikroOrmFixture = UserQueryOrderMapMikroOrmFixtures.any;

        result = userSortKeyAndOrderTypeToUserQueryOrderMapMikroOrmConverter.convert(userSortKeyAndOrderTypeFixture);
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should return a QueryOrderMap<UserMikroOrm>', () => {
        expect(result).toStrictEqual(userQueryOrderMapMikroOrmFixture);
      });
    });
  });
});
