import { QueryOrder } from '@mikro-orm/core';

import { OrderTypeToQueryOrderMikroOrmConverter } from './OrderTypeToQueryOrderMikroOrmConverter';
import { OrderType } from '../../../domain/model/OrderType';
import { OrderTypeFixtures } from '../../../fixtures/domain/model/OrderTypeFixtures';
import { QueryOrderMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/query/QueryOrderMikroOrmFixtures';

describe(OrderTypeToQueryOrderMikroOrmConverter.name, () => {
  let orderTypeToQueryOrderMikroOrmConverter: OrderTypeToQueryOrderMikroOrmConverter;

  beforeAll(() => {
    orderTypeToQueryOrderMikroOrmConverter = new OrderTypeToQueryOrderMikroOrmConverter();
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let orderTypeFixture: OrderType;
      let queryOrderMikroOrmFixture: QueryOrder;
      let result: unknown;

      beforeAll(() => {
        orderTypeFixture = OrderTypeFixtures.ASC;
        queryOrderMikroOrmFixture = QueryOrderMikroOrmFixtures.ASC;

        result = orderTypeToQueryOrderMikroOrmConverter.convert(orderTypeFixture);
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should return a QueryOrder', () => {
        expect(result).toStrictEqual(queryOrderMikroOrmFixture);
      });
    });
  });
});
