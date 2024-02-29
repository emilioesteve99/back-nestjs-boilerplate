import { QueryOrderMap } from '@mikro-orm/core';
import { Mocked } from 'vitest';

import { BaseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverter } from './BaseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverter';
import { Converter } from '../../../domain/converter/Converter';
import { BaseEntitySortKeyAndOrderType } from '../../../domain/model/BaseEntitySortKeyAndOrderType';
import { BaseEntitySortKeyAndOrderTypeFixtures } from '../../../fixtures/domain/model/BaseEntitySortKeyAndOrderTypeFixtures';
import { BaseEntityQueryOrderMapMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/query/BaseEntityQueryOrderMapMikroOrmFixtures';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';

describe(BaseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverter.name, () => {
  let baseEntitySortKeyAndOrderTypeOfToBaseEntityQueryOrderMapMikroOrmConverterMock: Mocked<
    Converter<BaseEntitySortKeyAndOrderType, QueryOrderMap<BaseEntityMikroOrm>>
  >;
  let baseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverter: BaseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverter<
    BaseEntitySortKeyAndOrderType[],
    QueryOrderMap<BaseEntityMikroOrm>[]
  >;

  beforeAll(() => {
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

      beforeAll(() => {
        baseEntitySortKeyAndOrderTypeFixture = BaseEntitySortKeyAndOrderTypeFixtures.withId;
        baseEntityQueryOrderMapMikroOrmFixture = BaseEntityQueryOrderMapMikroOrmFixtures.withId;

        baseEntitySortKeyAndOrderTypeOfToBaseEntityQueryOrderMapMikroOrmConverterMock.convert.mockReturnValueOnce(
          baseEntityQueryOrderMapMikroOrmFixture,
        );

        result = baseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverter.convert([
          baseEntitySortKeyAndOrderTypeFixture,
        ]);
      });

      afterAll(() => {
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
