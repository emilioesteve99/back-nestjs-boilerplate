import { QueryOrder } from '@mikro-orm/core';
import { OrderType } from '../../../domain/model/OrderType';
import { OrderTypeFixtures } from '../../../fixtures/domain/model/OrderTypeFixtures';
import { QueryOrderMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/query/QueryOrderMikroOrmFixtures';
import { OrderTypeToQueryOrderMikroOrmConverter } from './OrderTypeToQueryOrderMikroOrmConverter';

describe(OrderTypeToQueryOrderMikroOrmConverter.name, () => {
  let orderTypeToQueryOrderMikroOrmConverter: OrderTypeToQueryOrderMikroOrmConverter;

  beforeEach(() => {
    orderTypeToQueryOrderMikroOrmConverter = new OrderTypeToQueryOrderMikroOrmConverter();
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let orderTypeFixture: OrderType;
      let queryOrderMikroOrmFixture: QueryOrder;
      let result: unknown;

      beforeEach(() => {
        orderTypeFixture = OrderTypeFixtures.ASC;
        queryOrderMikroOrmFixture = QueryOrderMikroOrmFixtures.ASC;

        result = orderTypeToQueryOrderMikroOrmConverter.convert(orderTypeFixture);
      });

      afterEach(() => {
        vitest.clearAllMocks();
      });

      it('should return a QueryOrder', () => {
        expect(result).toStrictEqual(queryOrderMikroOrmFixture);
      });
    });
  });
});
