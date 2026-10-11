import { EntityData } from '@mikro-orm/core';
import { Mocked } from 'vitest';
import { BaseEntitySetCommand } from '../../../domain/command/BaseEntitySetCommand';
import { BaseEntityUpdateOneCommand } from '../../../domain/command/BaseEntityUpdateOneCommand';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { BaseEntityUpdateOneCommandFixtures } from '../../../fixtures/domain/command/BaseEntityUpdateOneCommandFixtures';
import { BaseEntitySetQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/command/BaseEntitySetQueryMikroOrmFixtures';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';
import { BaseEntityUpdateOneCommandToBaseEntitySetQueryMikroOrmConverterAsync } from './BaseEntityUpdateOneCommandToBaseEntitySetQueryMikroOrmConverterAsync';

describe(BaseEntityUpdateOneCommandToBaseEntitySetQueryMikroOrmConverterAsync.name, () => {
  let baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncMock: Mocked<
    ConverterAsync<BaseEntitySetCommand, EntityData<BaseEntityMikroOrm>>
  >;
  let baseEntityUpdateOneCommandToBaseEntitySetQueryMikroOrmConverterAsync: BaseEntityUpdateOneCommandToBaseEntitySetQueryMikroOrmConverterAsync<
    BaseEntityUpdateOneCommand,
    EntityData<BaseEntityMikroOrm>
  >;

  beforeEach(() => {
    baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncMock = {
      convert: vi.fn(),
    };

    baseEntityUpdateOneCommandToBaseEntitySetQueryMikroOrmConverterAsync =
      new BaseEntityUpdateOneCommandToBaseEntitySetQueryMikroOrmConverterAsync(
        baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncMock,
      );
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let baseEntityUpdateOneCommandFixture: BaseEntityUpdateOneCommand;
      let baseEntitySetQueryMikroOrmFixture: EntityData<BaseEntityMikroOrm>;
      let result: unknown;

      beforeEach(async () => {
        baseEntityUpdateOneCommandFixture = BaseEntityUpdateOneCommandFixtures.any;
        baseEntitySetQueryMikroOrmFixture = BaseEntitySetQueryMikroOrmFixtures.any;

        baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          baseEntitySetQueryMikroOrmFixture,
        );

        result = await baseEntityUpdateOneCommandToBaseEntitySetQueryMikroOrmConverterAsync.convert(
          baseEntityUpdateOneCommandFixture,
        );
      });

      afterEach(() => {
        vi.clearAllMocks();
      });

      it('should call baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncMock.convert()', () => {
        expect(baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledTimes(1);
        expect(baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(
          baseEntityUpdateOneCommandFixture.setCommand,
        );
      });

      it('should return a EntityData<BaseEntityMikroOrm>', () => {
        expect(result).toStrictEqual(baseEntitySetQueryMikroOrmFixture);
      });
    });
  });
});
