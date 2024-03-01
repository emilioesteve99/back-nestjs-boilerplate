import { FindOptions, QueryOrderMap } from '@mikro-orm/core';
import { Mock, Mocked } from 'vitest';

import { BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync } from './BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync';
import { Converter } from '../../../domain/converter/Converter';
import { BaseEntitySortKeyAndOrderType } from '../../../domain/model/BaseEntitySortKeyAndOrderType';
import { BaseEntityFindQuery } from '../../../domain/query/BaseEntityFindQuery';
import { BaseEntityFindQueryFixtures } from '../../../fixtures/domain/query/BaseEntityFindQueryFixtures';
import { BaseEntityFindOptionsQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/query/BaseEntityFindOptionsQueryMikroOrmFixtures';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';

class BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsyncTest extends BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync<
  BaseEntityFindQuery,
  FindOptions<BaseEntityMikroOrm>
> {
  public constructor(
    convertToBaseEntityQueryOrderMapMikroOrmMock: Mocked<
      Converter<BaseEntitySortKeyAndOrderType[], QueryOrderMap<BaseEntityMikroOrm>[]>
    >,
    private readonly convertToEntityFindOptionsQueryMikroOrmMock: Mock<
      [BaseEntityFindQuery, FindOptions<BaseEntityMikroOrm>],
      Promise<FindOptions<BaseEntityMikroOrm>>
    >,
  ) {
    super(convertToBaseEntityQueryOrderMapMikroOrmMock);
  }

  protected async convertToSpecificEntityFindOptionsQueryMikroOrm(
    input: BaseEntityFindQuery,
    baseEntityFindOptionsQueryMikroOrm: FindOptions<BaseEntityMikroOrm>,
  ): Promise<FindOptions<BaseEntityMikroOrm>> {
    return this.convertToEntityFindOptionsQueryMikroOrmMock(input, baseEntityFindOptionsQueryMikroOrm);
  }
}

describe(BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync.name, () => {
  let baseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverterMock: Mocked<
    Converter<BaseEntitySortKeyAndOrderType[], QueryOrderMap<BaseEntityMikroOrm>[]>
  >;
  let convertToEntityFindOptionsQueryMikroOrmMock: Mock<
    [BaseEntityFindQuery, FindOptions<BaseEntityMikroOrm>],
    Promise<FindOptions<BaseEntityMikroOrm>>
  >;
  let baseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync: BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsyncTest;

  beforeAll(() => {
    baseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverterMock = {
      convert: vi.fn(),
    };
    convertToEntityFindOptionsQueryMikroOrmMock = vi.fn();

    baseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync =
      new BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsyncTest(
        baseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverterMock,
        convertToEntityFindOptionsQueryMikroOrmMock,
      );
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let baseEntityFindQueryFixture: BaseEntityFindQuery;
      let baseEntityFindOptionsQueryMikroOrmFixture: FindOptions<BaseEntityMikroOrm>;
      let result: unknown;

      beforeAll(async () => {
        baseEntityFindQueryFixture = BaseEntityFindQueryFixtures.withSortKeyAndOrderTypes;
        baseEntityFindOptionsQueryMikroOrmFixture = BaseEntityFindOptionsQueryMikroOrmFixtures.withOrderBy;

        baseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverterMock.convert.mockReturnValueOnce(
          baseEntityFindOptionsQueryMikroOrmFixture.orderBy as QueryOrderMap<BaseEntityMikroOrm>[],
        );

        convertToEntityFindOptionsQueryMikroOrmMock.mockResolvedValueOnce(baseEntityFindOptionsQueryMikroOrmFixture);

        result = await baseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync.convert(
          baseEntityFindQueryFixture,
        );
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call baseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverter.convert()', () => {
        expect(
          baseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverterMock.convert,
        ).toHaveBeenCalledOnce();
        expect(
          baseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverterMock.convert,
        ).toHaveBeenCalledWith(baseEntityFindQueryFixture.sortKeyAndOrderTypes);
      });

      it('should call convertToEntityFindOptionsQueryMikroOrm()', () => {
        expect(convertToEntityFindOptionsQueryMikroOrmMock).toHaveBeenCalledOnce();
        expect(convertToEntityFindOptionsQueryMikroOrmMock).toHaveBeenCalledWith(
          baseEntityFindQueryFixture,
          baseEntityFindOptionsQueryMikroOrmFixture,
        );
      });

      it('should return a FindOptions<BaseEntityMikroOrm>', () => {
        expect(result).toStrictEqual(baseEntityFindOptionsQueryMikroOrmFixture);
      });
    });
  });
});
