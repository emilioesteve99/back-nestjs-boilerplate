import { ObjectQuery } from '@mikro-orm/core';
import { Mocked } from 'vitest';

import { BaseEntityUpdateCommandToBaseEntityFindQueryMikroOrmConverterAsync } from './BaseEntityUpdateCommandToBaseEntityFindQueryMikroOrmConverterAsync';
import { BaseEntityUpdateCommand } from '../../../domain/command/BaseEntityUpdateCommand';
import { BaseEntityUpdateOneCommand } from '../../../domain/command/BaseEntityUpdateOneCommand';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { BaseEntityUpdateOneCommandFixtures } from '../../../fixtures/domain/command/BaseEntityUpdateOneCommandFixtures';
import { BaseEntityFindQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/query/BaseEntityFindQueryMikroOrmFixtures';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';

describe(BaseEntityUpdateCommandToBaseEntityFindQueryMikroOrmConverterAsync.name, () => {
  let baseEntityUpdateOneCommandToBaseEntityFindQueryMikroOrmConverterAsyncMock: Mocked<
    ConverterAsync<BaseEntityUpdateOneCommand, ObjectQuery<BaseEntityMikroOrm>>
  >;

  let baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync: BaseEntityUpdateCommandToBaseEntityFindQueryMikroOrmConverterAsync<
    BaseEntityUpdateCommand,
    ObjectQuery<BaseEntityMikroOrm>[]
  >;

  beforeAll(() => {
    baseEntityUpdateOneCommandToBaseEntityFindQueryMikroOrmConverterAsyncMock = {
      convert: vi.fn(),
    };

    baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync =
      new BaseEntityUpdateCommandToBaseEntityFindQueryMikroOrmConverterAsync(
        baseEntityUpdateOneCommandToBaseEntityFindQueryMikroOrmConverterAsyncMock,
      );
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let baseEntityUpdateCommandFixture: BaseEntityUpdateCommand;
      let baseEntityFindQueryMikroOrmFixture: ObjectQuery<BaseEntityMikroOrm>[];
      let result: unknown;

      beforeAll(async () => {
        baseEntityUpdateCommandFixture = {
          commands: [BaseEntityUpdateOneCommandFixtures.any],
        };
        baseEntityFindQueryMikroOrmFixture = [BaseEntityFindQueryMikroOrmFixtures.any];

        for (let nthCall: number = 1; nthCall <= baseEntityUpdateCommandFixture.commands.length; nthCall++) {
          baseEntityUpdateOneCommandToBaseEntityFindQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
            baseEntityFindQueryMikroOrmFixture[nthCall - 1] as ObjectQuery<BaseEntityMikroOrm>,
          );
        }

        result = await baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync.convert(
          baseEntityUpdateCommandFixture,
        );
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call baseEntityUpdateOneCommandToBaseEntityFindQueryMikroOrmConverterAsync.convert()', () => {
        expect(baseEntityUpdateOneCommandToBaseEntityFindQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledTimes(
          baseEntityUpdateCommandFixture.commands.length,
        );

        for (let nthCall: number = 1; nthCall <= baseEntityUpdateCommandFixture.commands.length; nthCall++) {
          expect(
            baseEntityUpdateOneCommandToBaseEntityFindQueryMikroOrmConverterAsyncMock.convert,
          ).toHaveBeenNthCalledWith(nthCall, baseEntityUpdateCommandFixture.commands[nthCall - 1]);
        }
      });

      it('should return a ObjectQuery<BaseEntityMikroOrm>[]', () => {
        expect(result).toStrictEqual(baseEntityFindQueryMikroOrmFixture);
      });
    });
  });
});
