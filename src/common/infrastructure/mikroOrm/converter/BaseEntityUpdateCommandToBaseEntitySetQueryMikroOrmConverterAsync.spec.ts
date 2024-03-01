import { EntityData } from '@mikro-orm/core';
import { Mocked } from 'vitest';

import { BaseEntityUpdateCommandToBaseEntitySetQueryMikroOrmConverterAsync } from './BaseEntityUpdateCommandToBaseEntitySetQueryMikroOrmConverterAsync';
import { BaseEntityUpdateCommand } from '../../../domain/command/BaseEntityUpdateCommand';
import { BaseEntityUpdateOneCommand } from '../../../domain/command/BaseEntityUpdateOneCommand';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { BaseEntityUpdateOneCommandFixtures } from '../../../fixtures/domain/command/BaseEntityUpdateOneCommandFixtures';
import { BaseEntitySetQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/command/BaseEntitySetQueryMikroOrmFixtures';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';

describe(BaseEntityUpdateCommandToBaseEntitySetQueryMikroOrmConverterAsync.name, () => {
  let baseEntityUpdateOneCommandToBaseEntitySetQueryMikroOrmConverterAsyncMock: Mocked<
    ConverterAsync<BaseEntityUpdateOneCommand, EntityData<BaseEntityMikroOrm>>
  >;

  let baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsync: BaseEntityUpdateCommandToBaseEntitySetQueryMikroOrmConverterAsync<
    BaseEntityUpdateCommand,
    EntityData<BaseEntityMikroOrm>[]
  >;

  beforeAll(() => {
    baseEntityUpdateOneCommandToBaseEntitySetQueryMikroOrmConverterAsyncMock = {
      convert: vi.fn(),
    };

    baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsync =
      new BaseEntityUpdateCommandToBaseEntitySetQueryMikroOrmConverterAsync(
        baseEntityUpdateOneCommandToBaseEntitySetQueryMikroOrmConverterAsyncMock,
      );
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let baseEntityUpdateCommandFixture: BaseEntityUpdateCommand;
      let baseEntitySetQueryMikroOrmFixture: EntityData<BaseEntityMikroOrm>[];
      let result: unknown;

      beforeAll(async () => {
        baseEntityUpdateCommandFixture = {
          commands: [BaseEntityUpdateOneCommandFixtures.any],
        };
        baseEntitySetQueryMikroOrmFixture = [BaseEntitySetQueryMikroOrmFixtures.any];

        for (let nthCall: number = 1; nthCall <= baseEntityUpdateCommandFixture.commands.length; nthCall++) {
          baseEntityUpdateOneCommandToBaseEntitySetQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
            baseEntitySetQueryMikroOrmFixture[nthCall - 1] as EntityData<BaseEntityMikroOrm>,
          );
        }

        result = await baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsync.convert(
          baseEntityUpdateCommandFixture,
        );
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call baseEntityUpdateOneCommandToBaseEntitySetQueryMikroOrmConverterAsync.convert()', () => {
        expect(baseEntityUpdateOneCommandToBaseEntitySetQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledTimes(
          baseEntityUpdateCommandFixture.commands.length,
        );

        for (let nthCall: number = 1; nthCall <= baseEntityUpdateCommandFixture.commands.length; nthCall++) {
          expect(
            baseEntityUpdateOneCommandToBaseEntitySetQueryMikroOrmConverterAsyncMock.convert,
          ).toHaveBeenNthCalledWith(nthCall, baseEntityUpdateCommandFixture.commands[nthCall - 1]);
        }
      });

      it('should return a EntityData<BaseEntityMikroOrm>[]', () => {
        expect(result).toStrictEqual(baseEntitySetQueryMikroOrmFixture);
      });
    });
  });
});
