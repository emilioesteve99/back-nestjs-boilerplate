import { ObjectQuery } from '@mikro-orm/core';
import { Mocked } from 'vitest';
import { BaseEntityUpdateOneCommand } from '../../../domain/command/BaseEntityUpdateOneCommand';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { BaseEntityFindQuery } from '../../../domain/query/BaseEntityFindQuery';
import { BaseEntityUpdateOneCommandFixtures } from '../../../fixtures/domain/command/BaseEntityUpdateOneCommandFixtures';
import { BaseEntityFindQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/query/BaseEntityFindQueryMikroOrmFixtures';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';
import { BaseEntityUpdateOneCommandToBaseEntityFindQueryMikroOrmConverterAsync } from './BaseEntityUpdateOneCommandToBaseEntityFindQueryMikroOrmConverterAsync';

describe(BaseEntityUpdateOneCommandToBaseEntityFindQueryMikroOrmConverterAsync.name, () => {
  let baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncMock: Mocked<
    ConverterAsync<BaseEntityFindQuery, ObjectQuery<BaseEntityMikroOrm>>
  >;
  let baseEntityUpdateOneCommandToBaseEntityFindQueryMikroOrmConverterAsync: BaseEntityUpdateOneCommandToBaseEntityFindQueryMikroOrmConverterAsync<
    BaseEntityUpdateOneCommand,
    ObjectQuery<BaseEntityMikroOrm>
  >;

  beforeEach(() => {
    baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncMock = {
      convert: vi.fn(),
    };

    baseEntityUpdateOneCommandToBaseEntityFindQueryMikroOrmConverterAsync =
      new BaseEntityUpdateOneCommandToBaseEntityFindQueryMikroOrmConverterAsync(
        baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncMock,
      );
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let baseEntityUpdateOneCommandFixture: BaseEntityUpdateOneCommand;
      let baseEntityFindQueryMikroOrmFixture: ObjectQuery<BaseEntityMikroOrm>;
      let result: unknown;

      beforeEach(async () => {
        baseEntityUpdateOneCommandFixture = BaseEntityUpdateOneCommandFixtures.any;
        baseEntityFindQueryMikroOrmFixture = BaseEntityFindQueryMikroOrmFixtures.any;

        baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          baseEntityFindQueryMikroOrmFixture,
        );

        result = await baseEntityUpdateOneCommandToBaseEntityFindQueryMikroOrmConverterAsync.convert(
          baseEntityUpdateOneCommandFixture,
        );
      });

      afterEach(() => {
        vi.clearAllMocks();
      });

      it('should call baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync.convert()', () => {
        expect(baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledTimes(1);
        expect(baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(
          baseEntityUpdateOneCommandFixture.findQuery,
        );
      });

      it('should return a ObjectQuery<BaseEntityMikroOrm>', () => {
        expect(result).toStrictEqual(baseEntityFindQueryMikroOrmFixture);
      });
    });
  });
});
