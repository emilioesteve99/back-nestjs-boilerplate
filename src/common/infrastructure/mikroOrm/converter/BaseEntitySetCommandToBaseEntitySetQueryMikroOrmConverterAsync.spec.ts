import { EntityData } from '@mikro-orm/core';
import { afterAll, beforeAll, Mock } from 'vitest';

import { BaseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsync } from './BaseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsync';
import { BaseEntitySetCommand } from '../../../domain/command/BaseEntitySetCommand';
import { BaseEntitySetCommandFixtures } from '../../../fixtures/domain/command/BaseEntitySetCommandFixtures';
import { BaseEntitySetQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/command/BaseEntitySetQueryMikroOrmFixtures';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';

class BaseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncTest extends BaseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsync<
  BaseEntitySetCommand,
  EntityData<BaseEntityMikroOrm>
> {
  public constructor(
    private readonly convertToEntitySetQueryMikroOrmMock: Mock<
      [BaseEntitySetCommand, EntityData<BaseEntityMikroOrm>],
      Promise<EntityData<BaseEntityMikroOrm>>
    >,
  ) {
    super();
  }

  protected async convertToSpecificEntitySetQueryMikroOrm(
    input: BaseEntitySetCommand,
    baseEntitySetQueryMikroOrm: EntityData<BaseEntityMikroOrm>,
  ): Promise<EntityData<BaseEntityMikroOrm>> {
    return this.convertToEntitySetQueryMikroOrmMock(input, baseEntitySetQueryMikroOrm);
  }

  public override setPropertyIfNotUndefined(
    input: BaseEntitySetCommand,
    setQueryMikroOrm: EntityData<BaseEntityMikroOrm>,
    commandProperty: keyof BaseEntitySetCommand,
    entityProperty: keyof EntityData<BaseEntityMikroOrm>,
  ): void {
    super.setPropertyIfNotUndefined(input, setQueryMikroOrm, commandProperty, entityProperty);
  }
}

describe(BaseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsync.name, () => {
  let convertToEntitySetQueryMikroOrmMock: Mock<
    [BaseEntitySetCommand, EntityData<BaseEntityMikroOrm>],
    Promise<EntityData<BaseEntityMikroOrm>>
  >;

  let baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncTest: BaseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncTest;

  beforeAll(() => {
    convertToEntitySetQueryMikroOrmMock = vi.fn();

    baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncTest =
      new BaseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncTest(convertToEntitySetQueryMikroOrmMock);
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let baseEntitySetCommandFixture: BaseEntitySetCommand;
      let baseEntitySetQueryMikroOrmFixture: EntityData<BaseEntityMikroOrm>;
      let result: unknown;

      beforeAll(async () => {
        baseEntitySetCommandFixture = BaseEntitySetCommandFixtures.any;
        baseEntitySetQueryMikroOrmFixture = BaseEntitySetQueryMikroOrmFixtures.any;

        convertToEntitySetQueryMikroOrmMock.mockResolvedValueOnce(baseEntitySetQueryMikroOrmFixture);

        result = await baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncTest.convert(
          baseEntitySetCommandFixture,
        );
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call convertToEntitySetQueryMikroOrm()', () => {
        expect(convertToEntitySetQueryMikroOrmMock).toHaveBeenCalledOnce();
        expect(convertToEntitySetQueryMikroOrmMock).toHaveBeenCalledWith(
          baseEntitySetCommandFixture,
          baseEntitySetQueryMikroOrmFixture,
        );
      });

      it('should return a EntityData<BaseEntityMikroOrm>', () => {
        expect(result).toStrictEqual(baseEntitySetQueryMikroOrmFixture);
      });
    });
  });

  describe('setPropertyIfNotUndefined()', () => {
    describe('when called', () => {
      let input: BaseEntitySetCommand;
      let setQueryMikroOrm: EntityData<BaseEntityMikroOrm>;
      let commandProperty: keyof BaseEntitySetCommand;
      let entityProperty: keyof EntityData<BaseEntityMikroOrm>;

      beforeAll(() => {
        input = { foo: 'foo' };
        setQueryMikroOrm = {} as unknown as EntityData<BaseEntityMikroOrm>;
        commandProperty = 'foo' as unknown as never;
        entityProperty = 'foo' as unknown as never;

        baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncTest.setPropertyIfNotUndefined(
          input,
          setQueryMikroOrm,
          commandProperty,
          entityProperty,
        );
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should set the property in setQueryMikroOrm', () => {
        expect(setQueryMikroOrm).toStrictEqual({ foo: 'foo' });
      });
    });
  });
});
