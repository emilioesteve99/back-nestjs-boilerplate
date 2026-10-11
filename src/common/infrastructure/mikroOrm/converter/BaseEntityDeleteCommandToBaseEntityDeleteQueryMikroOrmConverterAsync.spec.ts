import { ObjectQuery } from '@mikro-orm/core';
import { Mock } from 'vitest';
import { BaseEntityDeleteCommand } from '../../../domain/command/BaseEntityDeleteCommand';
import { BaseEntityDeleteCommandFixtures } from '../../../fixtures/domain/command/BaseEntityDeleteCommandFixtures';
import { BaseEntityDeleteQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/command/BaseEntityDeleteQueryMikroOrmFixtures';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';
import { BaseEntityDeleteCommandToBaseEntityDeleteQueryMikroOrmConverterAsync } from './BaseEntityDeleteCommandToBaseEntityDeleteQueryMikroOrmConverterAsync';

class BaseEntityDeleteCommandToBaseEntityDeleteQueryMikroOrmConverterAsyncTest extends BaseEntityDeleteCommandToBaseEntityDeleteQueryMikroOrmConverterAsync<
  BaseEntityDeleteCommand,
  ObjectQuery<BaseEntityMikroOrm>
> {
  public constructor(
    private readonly convertToEntityDeleteQueryMikroOrmMock: Mock<
      (...args: [BaseEntityDeleteCommand, ObjectQuery<BaseEntityMikroOrm>]) => Promise<ObjectQuery<BaseEntityMikroOrm>>
    >,
  ) {
    super();
  }

  protected async convertToSpecificEntityDeleteQueryMikroOrm(
    input: BaseEntityDeleteCommand,
    baseEntityDeleteQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm>,
  ): Promise<ObjectQuery<BaseEntityMikroOrm>> {
    return this.convertToEntityDeleteQueryMikroOrmMock(input, baseEntityDeleteQueryMikroOrm);
  }
}

describe(BaseEntityDeleteCommandToBaseEntityDeleteQueryMikroOrmConverterAsync.name, () => {
  let convertToEntityDeleteQueryMikroOrmMock: Mock<
    (...args: [BaseEntityDeleteCommand, ObjectQuery<BaseEntityMikroOrm>]) => Promise<ObjectQuery<BaseEntityMikroOrm>>
  >;
  let baseEntityDeleteCommandToBaseEntityDeleteQueryMikroOrmConverterAsync: BaseEntityDeleteCommandToBaseEntityDeleteQueryMikroOrmConverterAsyncTest;

  beforeEach(() => {
    convertToEntityDeleteQueryMikroOrmMock = vi.fn();

    baseEntityDeleteCommandToBaseEntityDeleteQueryMikroOrmConverterAsync =
      new BaseEntityDeleteCommandToBaseEntityDeleteQueryMikroOrmConverterAsyncTest(
        convertToEntityDeleteQueryMikroOrmMock,
      );
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let baseEntityDeleteCommandFixture: BaseEntityDeleteCommand;
      let baseEntityDeleteQueryMikroOrmFixture: ObjectQuery<BaseEntityMikroOrm>;
      let result: unknown;

      beforeEach(async () => {
        baseEntityDeleteCommandFixture = BaseEntityDeleteCommandFixtures.withId;
        baseEntityDeleteQueryMikroOrmFixture = BaseEntityDeleteQueryMikroOrmFixtures.withId;

        convertToEntityDeleteQueryMikroOrmMock.mockResolvedValueOnce(baseEntityDeleteQueryMikroOrmFixture);

        result =
          await baseEntityDeleteCommandToBaseEntityDeleteQueryMikroOrmConverterAsync.convert(
            baseEntityDeleteCommandFixture,
          );
      });

      afterEach(() => {
        vi.clearAllMocks();
      });

      it('should call convertToEntityDeleteQueryMikroOrm()', () => {
        expect(convertToEntityDeleteQueryMikroOrmMock).toHaveBeenCalledOnce();
        expect(convertToEntityDeleteQueryMikroOrmMock).toHaveBeenCalledWith(
          baseEntityDeleteCommandFixture,
          baseEntityDeleteQueryMikroOrmFixture,
        );
      });

      it('should return a ObjectQuery<BaseEntityMikroOrm>', () => {
        expect(result).toStrictEqual(baseEntityDeleteQueryMikroOrmFixture);
      });
    });
  });
});
