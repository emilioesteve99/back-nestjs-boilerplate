import { QueryOrderMap } from '@mikro-orm/core';
import { Mocked } from 'vitest';
import { Converter } from '../../../domain/converter/Converter';
import { BaseEntitySortKeyAndOrderType } from '../../../domain/model/BaseEntitySortKeyAndOrderType';
import { BaseEntitySortKeyAndOrderTypeFixtures } from '../../../fixtures/domain/model/BaseEntitySortKeyAndOrderTypeFixtures';
import { BaseEntityQueryOrderMapMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/query/BaseEntityQueryOrderMapMikroOrmFixtures';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';
import { BaseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverter } from './BaseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverter';

describe(BaseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverter.name, () => {
  let baseEntitySortKeyAndOrderTypeOfToBaseEntityQueryOrderMapMikroOrmConverterMock: Mocked<
    Converter<BaseEntitySortKeyAndOrderType, QueryOrderMap<BaseEntityMikroOrm>>
  >;
  let baseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverter: BaseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverter<
    BaseEntitySortKeyAndOrderType[],
    QueryOrderMap<BaseEntityMikroOrm>[]
  >;

  beforeEach(() => {
    baseEntitySortKeyAndOrderTypeOfToBaseEntityQueryOrderMapMikroOrmConverterMock = {
      convert: vi.fn(),
    };

    baseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverter =
      new BaseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverter(
        baseEntitySortKeyAndOrderTypeOfToBaseEntityQueryOrderMapMikroOrmConverterMock,
      );
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let baseEntitySortKeyAndOrderTypeFixture: BaseEntitySortKeyAndOrderType;
      let baseEntityQueryOrderMapMikroOrmFixture: QueryOrderMap<BaseEntityMikroOrm>;
      let result: unknown;

      beforeEach(() => {
        baseEntitySortKeyAndOrderTypeFixture = BaseEntitySortKeyAndOrderTypeFixtures.withId;
        baseEntityQueryOrderMapMikroOrmFixture = BaseEntityQueryOrderMapMikroOrmFixtures.withId;

        baseEntitySortKeyAndOrderTypeOfToBaseEntityQueryOrderMapMikroOrmConverterMock.convert.mockReturnValueOnce(
          baseEntityQueryOrderMapMikroOrmFixture,
        );

        result = baseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverter.convert([
          baseEntitySortKeyAndOrderTypeFixture,
        ]);
      });

      afterEach(() => {
        vi.clearAllMocks();
      });

      it('should call baseEntitySortKeyAndOrderTypeOfToBaseEntityQueryOrderMapMikroOrmConverter.convert()', () => {
        expect(
          baseEntitySortKeyAndOrderTypeOfToBaseEntityQueryOrderMapMikroOrmConverterMock.convert,
        ).toHaveBeenCalledOnce();
        expect(
          baseEntitySortKeyAndOrderTypeOfToBaseEntityQueryOrderMapMikroOrmConverterMock.convert,
        ).toHaveBeenCalledWith(baseEntitySortKeyAndOrderTypeFixture);
      });

      it('should return QueryOrderMap<BaseEntityMikroOrm>[]', () => {
        expect(result).toStrictEqual([baseEntityQueryOrderMapMikroOrmFixture]);
      });
    });
  });
});
