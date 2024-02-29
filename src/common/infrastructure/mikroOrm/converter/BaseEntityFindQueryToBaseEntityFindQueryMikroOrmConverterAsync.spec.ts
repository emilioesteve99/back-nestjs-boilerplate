import { ObjectQuery } from '@mikro-orm/core';
import { afterAll, beforeAll, Mock } from 'vitest';

import { BaseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync } from './BaseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync';
import { BaseEntityFindQuery } from '../../../domain/query/BaseEntityFindQuery';
import { BaseEntityFindQueryFixtures } from '../../../fixtures/domain/query/BaseEntityFindQueryFixtures';
import { BaseEntityFindQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/query/BaseEntityFindQueryMikroOrmFixtures';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';

class BaseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncTest extends BaseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync<
  BaseEntityFindQuery,
  ObjectQuery<BaseEntityMikroOrm>
> {
  public constructor(
    private readonly convertToEntityFindQueryMikroOrmMock: Mock<
      [BaseEntityFindQuery, ObjectQuery<BaseEntityMikroOrm>],
      Promise<ObjectQuery<BaseEntityMikroOrm>>
    >,
  ) {
    super();
  }

  protected async convertToSpecificEntityFindQueryMikroOrm(
    input: BaseEntityFindQuery,
    baseEntityFindQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm>,
  ): Promise<ObjectQuery<BaseEntityMikroOrm>> {
    return this.convertToEntityFindQueryMikroOrmMock(input, baseEntityFindQueryMikroOrm);
  }

  public override setPropertyIfNotUndefined(
    input: BaseEntityFindQuery,
    findQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm>,
    queryProperty: keyof BaseEntityFindQuery,
    entityProperty: keyof ObjectQuery<BaseEntityMikroOrm>,
  ): void {
    super.setPropertyIfNotUndefined(input, findQueryMikroOrm, queryProperty, entityProperty);
  }
}

describe(BaseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync.name, () => {
  let convertToEntityFindQueryMikroOrmMock: Mock<
    [BaseEntityFindQuery, ObjectQuery<BaseEntityMikroOrm>],
    Promise<ObjectQuery<BaseEntityMikroOrm>>
  >;
  let baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync: BaseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncTest;

  beforeAll(() => {
    convertToEntityFindQueryMikroOrmMock = vi.fn();

    baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync =
      new BaseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncTest(convertToEntityFindQueryMikroOrmMock);
  });

  describe('.convert()', () => {
    describe('having a BaseEntityFindQuery with ids', () => {
      describe('when called', () => {
        let baseEntityFindQueryFixture: BaseEntityFindQuery;
        let baseEntityFindQueryMikroOrmFixture: ObjectQuery<BaseEntityMikroOrm>;
        let result: unknown;

        beforeAll(async () => {
          baseEntityFindQueryFixture = BaseEntityFindQueryFixtures.withIds;
          baseEntityFindQueryMikroOrmFixture = BaseEntityFindQueryMikroOrmFixtures.withIds;

          convertToEntityFindQueryMikroOrmMock.mockResolvedValueOnce(baseEntityFindQueryMikroOrmFixture);

          result = await baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync.convert(
            baseEntityFindQueryFixture,
          );
        });

        afterAll(() => {
          vi.clearAllMocks();
        });

        it('should call convertToEntityFindQueryMikroOrm()', () => {
          expect(convertToEntityFindQueryMikroOrmMock).toHaveBeenCalledOnce();
          expect(convertToEntityFindQueryMikroOrmMock).toHaveBeenCalledWith(
            baseEntityFindQueryFixture,
            baseEntityFindQueryMikroOrmFixture,
          );
        });

        it('should return a ObjectQuery<BaseEntityMikroOrm>', () => {
          expect(result).toStrictEqual(baseEntityFindQueryMikroOrmFixture);
        });
      });
    });
  });

  describe('setPropertyIfNotUndefined()', () => {
    describe('when called', () => {
      let input: BaseEntityFindQuery;
      let findQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm>;
      let queryProperty: keyof BaseEntityFindQuery;
      let entityProperty: keyof ObjectQuery<BaseEntityMikroOrm>;

      beforeAll(() => {
        input = BaseEntityFindQueryFixtures.withIds;
        findQueryMikroOrm = {
          ids: BaseEntityFindQueryFixtures.any.ids,
        } as unknown as ObjectQuery<BaseEntityMikroOrm>;
        queryProperty = 'ids';
        entityProperty = 'ids' as any;

        baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync.setPropertyIfNotUndefined(
          input,
          findQueryMikroOrm,
          queryProperty,
          entityProperty,
        );
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should set the property in findQueryMikroOrm', () => {
        expect(findQueryMikroOrm).toStrictEqual({ ids: BaseEntityFindQueryFixtures.withIds.ids });
      });
    });
  });
});
