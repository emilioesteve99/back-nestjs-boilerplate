import { RequiredEntityData } from '@mikro-orm/core';
import { Mock } from 'vitest';

import { BaseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsync } from './BaseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsync';
import { BaseEntityInsertOneCommand } from '../../../domain/command/BaseEntityInsertOneCommand';
import { BaseEntityInsertOneCommandFixtures } from '../../../fixtures/domain/command/BaseEntityInsertOneCommandFixtures';
import { BaseEntityInsertOneQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/command/BaseEntityInsertOneQueryMikroOrmFixtures';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';

class BaseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsyncTest extends BaseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsync<
  BaseEntityInsertOneCommand,
  RequiredEntityData<BaseEntityMikroOrm>
> {
  public constructor(
    private readonly convertToEntityInsertOneQueryMikroOrmMock: Mock<
      [BaseEntityInsertOneCommand, RequiredEntityData<BaseEntityMikroOrm>],
      Promise<RequiredEntityData<BaseEntityMikroOrm>>
    >,
  ) {
    super();
  }

  protected async convertToSpecificEntityInsertOneQueryMikroOrm(
    input: BaseEntityInsertOneCommand,
    baseEntityInsertOneQueryMikroOrm: RequiredEntityData<BaseEntityMikroOrm>,
  ): Promise<RequiredEntityData<BaseEntityMikroOrm>> {
    return this.convertToEntityInsertOneQueryMikroOrmMock(input, baseEntityInsertOneQueryMikroOrm);
  }
}

describe(BaseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsync.name, () => {
  let convertToEntityInsertOneQueryMikroOrmMock: Mock<
    [BaseEntityInsertOneCommand, RequiredEntityData<BaseEntityMikroOrm>],
    Promise<RequiredEntityData<BaseEntityMikroOrm>>
  >;

  let baseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsyncTest: BaseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsyncTest;

  beforeAll(() => {
    convertToEntityInsertOneQueryMikroOrmMock = vi.fn();

    baseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsyncTest =
      new BaseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsyncTest(
        convertToEntityInsertOneQueryMikroOrmMock,
      );
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let baseEntityInsertOneCommandFixture: BaseEntityInsertOneCommand;
      let baseEntityInsertOneQueryMikroOrmFixture: RequiredEntityData<BaseEntityMikroOrm>;
      let result: unknown;

      beforeAll(async () => {
        baseEntityInsertOneCommandFixture = BaseEntityInsertOneCommandFixtures.any;
        baseEntityInsertOneQueryMikroOrmFixture = BaseEntityInsertOneQueryMikroOrmFixtures.any;

        convertToEntityInsertOneQueryMikroOrmMock.mockResolvedValueOnce(baseEntityInsertOneQueryMikroOrmFixture);

        result = await baseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsyncTest.convert(
          baseEntityInsertOneCommandFixture,
        );
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call convertToEntityInsertOneQueryMikroOrm()', () => {
        expect(convertToEntityInsertOneQueryMikroOrmMock).toHaveBeenCalledOnce();
        expect(convertToEntityInsertOneQueryMikroOrmMock).toHaveBeenCalledWith(
          baseEntityInsertOneCommandFixture,
          baseEntityInsertOneQueryMikroOrmFixture,
        );
      });

      it('should return a RequiredEntityData<BaseEntityMikroOrm>', () => {
        expect(result).toStrictEqual(baseEntityInsertOneQueryMikroOrmFixture);
      });
    });
  });
});
