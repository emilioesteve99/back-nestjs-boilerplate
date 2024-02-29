import { QueryOrder, QueryOrderMap } from '@mikro-orm/core';
import { Mock, Mocked } from 'vitest';

import { BaseEntitySortKeyAndOrderTypeToBaseEntityQueryOrderMapMikroOrmConverter } from './BaseEntitySortKeyAndOrderTypeToBaseEntityQueryOrderMapMikroOrmConverter';
import { Converter } from '../../../domain/converter/Converter';
import { BaseEntitySortKeyAndOrderType } from '../../../domain/model/BaseEntitySortKeyAndOrderType';
import { OrderType } from '../../../domain/model/OrderType';
import { BaseEntitySortKeyAndOrderTypeFixtures } from '../../../fixtures/domain/model/BaseEntitySortKeyAndOrderTypeFixtures';
import { BaseEntityQueryOrderMapMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/query/BaseEntityQueryOrderMapMikroOrmFixtures';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';

class BaseEntitySortKeyAndOrderTypeToBaseEntityQueryOrderMapMikroOrmConverterTest extends BaseEntitySortKeyAndOrderTypeToBaseEntityQueryOrderMapMikroOrmConverter<
  BaseEntitySortKeyAndOrderType,
  QueryOrderMap<BaseEntityMikroOrm>
> {
  public constructor(
    private readonly convertToSpecificEntityQueryOrderMapMikroOrmMock: Mock<
      [BaseEntitySortKeyAndOrderType, QueryOrderMap<BaseEntityMikroOrm>],
      QueryOrderMap<BaseEntityMikroOrm>
    >,
    orderTypeToQueryOrderMikroOrmConverterMock: Mocked<Converter<OrderType, QueryOrder>>,
  ) {
    super(orderTypeToQueryOrderMikroOrmConverterMock);
  }

  protected override convertToSpecificEntityQueryOrderMapMikroOrm(
    input: BaseEntitySortKeyAndOrderType,
    baseEntityQueryOrderMapMikroOrm: QueryOrderMap<BaseEntityMikroOrm>,
  ): QueryOrderMap<BaseEntityMikroOrm> {
    return this.convertToSpecificEntityQueryOrderMapMikroOrmMock(input, baseEntityQueryOrderMapMikroOrm);
  }
}

describe(BaseEntitySortKeyAndOrderTypeToBaseEntityQueryOrderMapMikroOrmConverter.name, () => {
  let convertToSpecificEntityQueryOrderMapMikroOrmMock: Mock<
    [BaseEntitySortKeyAndOrderType, QueryOrderMap<BaseEntityMikroOrm>],
    QueryOrderMap<BaseEntityMikroOrm>
  >;
  let orderTypeToQueryOrderMikroOrmConverterMock: Mocked<Converter<OrderType, QueryOrder>>;
  let baseEntitySortKeyAndOrderTypeToBaseEntityQueryOrderMapMikroOrmConverterTest: BaseEntitySortKeyAndOrderTypeToBaseEntityQueryOrderMapMikroOrmConverterTest;

  beforeAll(() => {
    convertToSpecificEntityQueryOrderMapMikroOrmMock = vi.fn();
    orderTypeToQueryOrderMikroOrmConverterMock = {
      convert: vi.fn(),
    };

    baseEntitySortKeyAndOrderTypeToBaseEntityQueryOrderMapMikroOrmConverterTest =
      new BaseEntitySortKeyAndOrderTypeToBaseEntityQueryOrderMapMikroOrmConverterTest(
        convertToSpecificEntityQueryOrderMapMikroOrmMock,
        orderTypeToQueryOrderMikroOrmConverterMock,
      );
  });

  describe('.convert()', () => {
    describe('having a BaseEntitySortKeyAndOrderType with createdAt', () => {
      describe('when called', () => {
        let baseEntitySortKeyAndOrderTypeFixture: BaseEntitySortKeyAndOrderType;
        let baseEntityQueryOrderMapMikroOrmFixture: QueryOrderMap<BaseEntityMikroOrm>;
        let result: unknown;

        beforeAll(() => {
          baseEntitySortKeyAndOrderTypeFixture = BaseEntitySortKeyAndOrderTypeFixtures.withCreatedAt;
          baseEntityQueryOrderMapMikroOrmFixture = BaseEntityQueryOrderMapMikroOrmFixtures.withCreatedAt;

          orderTypeToQueryOrderMikroOrmConverterMock.convert.mockReturnValueOnce(
            baseEntityQueryOrderMapMikroOrmFixture.createdAt as QueryOrder,
          );

          convertToSpecificEntityQueryOrderMapMikroOrmMock.mockReturnValueOnce(baseEntityQueryOrderMapMikroOrmFixture);

          result = baseEntitySortKeyAndOrderTypeToBaseEntityQueryOrderMapMikroOrmConverterTest.convert(
            baseEntitySortKeyAndOrderTypeFixture,
          );
        });

        afterAll(() => {
          vi.clearAllMocks();
        });

        it('should call convertToSpecificEntityQueryOrderMapMikroOrm()', () => {
          expect(convertToSpecificEntityQueryOrderMapMikroOrmMock).toHaveBeenCalledOnce();
          expect(convertToSpecificEntityQueryOrderMapMikroOrmMock).toHaveBeenCalledWith(
            baseEntitySortKeyAndOrderTypeFixture,
            baseEntityQueryOrderMapMikroOrmFixture,
          );
        });

        it('should return a QueryOrderMap<BaseEntityMikroOrm>', () => {
          expect(result).toStrictEqual(baseEntityQueryOrderMapMikroOrmFixture);
        });
      });
    });

    describe('having a BaseEntitySortKeyAndOrderType with id', () => {
      describe('when called', () => {
        let baseEntitySortKeyAndOrderTypeFixture: BaseEntitySortKeyAndOrderType;
        let baseEntityQueryOrderMapMikroOrmFixture: QueryOrderMap<BaseEntityMikroOrm>;
        let result: unknown;

        beforeAll(() => {
          baseEntitySortKeyAndOrderTypeFixture = BaseEntitySortKeyAndOrderTypeFixtures.withId;
          baseEntityQueryOrderMapMikroOrmFixture = BaseEntityQueryOrderMapMikroOrmFixtures.withId;

          orderTypeToQueryOrderMikroOrmConverterMock.convert.mockReturnValueOnce(
            baseEntityQueryOrderMapMikroOrmFixture.id as QueryOrder,
          );

          convertToSpecificEntityQueryOrderMapMikroOrmMock.mockReturnValueOnce(baseEntityQueryOrderMapMikroOrmFixture);

          result = baseEntitySortKeyAndOrderTypeToBaseEntityQueryOrderMapMikroOrmConverterTest.convert(
            baseEntitySortKeyAndOrderTypeFixture,
          );
        });

        afterAll(() => {
          vi.clearAllMocks();
        });

        it('should call convertToSpecificEntityQueryOrderMapMikroOrm()', () => {
          expect(convertToSpecificEntityQueryOrderMapMikroOrmMock).toHaveBeenCalledOnce();
          expect(convertToSpecificEntityQueryOrderMapMikroOrmMock).toHaveBeenCalledWith(
            baseEntitySortKeyAndOrderTypeFixture,
            baseEntityQueryOrderMapMikroOrmFixture,
          );
        });

        it('should return a QueryOrderMap<BaseEntityMikroOrm>', () => {
          expect(result).toStrictEqual(baseEntityQueryOrderMapMikroOrmFixture);
        });
      });
    });

    describe('having a BaseEntitySortKeyAndOrderType with updatedAt', () => {
      describe('when called', () => {
        let baseEntitySortKeyAndOrderTypeFixture: BaseEntitySortKeyAndOrderType;
        let baseEntityQueryOrderMapMikroOrmFixture: QueryOrderMap<BaseEntityMikroOrm>;
        let result: unknown;

        beforeAll(() => {
          baseEntitySortKeyAndOrderTypeFixture = BaseEntitySortKeyAndOrderTypeFixtures.withUpdatedAt;
          baseEntityQueryOrderMapMikroOrmFixture = BaseEntityQueryOrderMapMikroOrmFixtures.withUpdatedAt;

          convertToSpecificEntityQueryOrderMapMikroOrmMock.mockReturnValueOnce(baseEntityQueryOrderMapMikroOrmFixture);
          orderTypeToQueryOrderMikroOrmConverterMock.convert.mockReturnValueOnce(
            baseEntityQueryOrderMapMikroOrmFixture.updatedAt as QueryOrder,
          );

          result = baseEntitySortKeyAndOrderTypeToBaseEntityQueryOrderMapMikroOrmConverterTest.convert(
            baseEntitySortKeyAndOrderTypeFixture,
          );
        });

        afterAll(() => {
          vi.clearAllMocks();
        });

        it('should call convertToSpecificEntityQueryOrderMapMikroOrm()', () => {
          expect(convertToSpecificEntityQueryOrderMapMikroOrmMock).toHaveBeenCalledOnce();
          expect(convertToSpecificEntityQueryOrderMapMikroOrmMock).toHaveBeenCalledWith(
            baseEntitySortKeyAndOrderTypeFixture,
            baseEntityQueryOrderMapMikroOrmFixture,
          );
        });

        it('should return a QueryOrderMap<BaseEntityMikroOrm>', () => {
          expect(result).toStrictEqual(baseEntityQueryOrderMapMikroOrmFixture);
        });
      });
    });
  });
});
