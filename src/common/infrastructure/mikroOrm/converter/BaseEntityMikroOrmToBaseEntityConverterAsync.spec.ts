import { Mock } from 'vitest';
import { BaseEntity } from '../../../domain/model/BaseEntity';
import { BaseEntityFixtures } from '../../../fixtures/domain/model/BaseEntityFixtures';
import { BaseEntityMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/model/BaseEntityMikroOrmFixtures';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';
import { BaseEntityMikroOrmToBaseEntityConverterAsync } from './BaseEntityMikroOrmToBaseEntityConverterAsync';

class BaseEntityMikroOrmToBaseEntityConverterAsyncTest extends BaseEntityMikroOrmToBaseEntityConverterAsync<
  BaseEntityMikroOrm,
  BaseEntity
> {
  public constructor(
    private readonly convertToEntityMock: Mock<(...args: [BaseEntityMikroOrm, BaseEntity]) => Promise<BaseEntity>>,
  ) {
    super();
  }

  protected async convertToSpecificEntity(input: BaseEntityMikroOrm, baseEntity: BaseEntity): Promise<BaseEntity> {
    return this.convertToEntityMock(input, baseEntity);
  }
}

describe(BaseEntityMikroOrmToBaseEntityConverterAsync.name, () => {
  let convertToEntityMock: Mock<(...args: [BaseEntityMikroOrm, BaseEntity]) => Promise<BaseEntity>>;
  let baseEntityMikroOrmToBaseEntityConverterAsyncTest: BaseEntityMikroOrmToBaseEntityConverterAsyncTest;

  beforeEach(() => {
    convertToEntityMock = vi.fn();

    baseEntityMikroOrmToBaseEntityConverterAsyncTest = new BaseEntityMikroOrmToBaseEntityConverterAsyncTest(
      convertToEntityMock,
    );
  });

  describe('.convert()', () => {
    describe('when called and BaseEntityMikroOrm.updatedBy is undefined', () => {
      let baseEntityMikroOrmFixture: BaseEntityMikroOrm;
      let baseEntityFixture: BaseEntity;
      let result: unknown;

      beforeEach(async () => {
        baseEntityMikroOrmFixture = BaseEntityMikroOrmFixtures.any;
        baseEntityFixture = BaseEntityFixtures.any;

        convertToEntityMock.mockResolvedValueOnce(baseEntityFixture);

        result = await baseEntityMikroOrmToBaseEntityConverterAsyncTest.convert(baseEntityMikroOrmFixture);
      });

      afterEach(() => {
        vi.clearAllMocks();
      });

      it('should call convertToEntity()', () => {
        expect(convertToEntityMock).toHaveBeenCalledOnce();
        expect(convertToEntityMock).toHaveBeenCalledWith(baseEntityMikroOrmFixture, baseEntityFixture);
      });

      it('should return a BaseEntity', () => {
        expect(result).toStrictEqual(baseEntityFixture);
      });
    });

    describe('when called and BaseEntityMikroOrm.updatedBy is not undefined', () => {
      let baseEntityMikroOrmFixture: BaseEntityMikroOrm;
      let baseEntityFixture: BaseEntity;
      let result: unknown;

      beforeEach(async () => {
        baseEntityMikroOrmFixture = BaseEntityMikroOrmFixtures.withUpdatedAtAndUpdatedBy;
        baseEntityFixture = BaseEntityFixtures.withUpdatedAtAndUpdatedById;

        convertToEntityMock.mockResolvedValueOnce(baseEntityFixture);

        result = await baseEntityMikroOrmToBaseEntityConverterAsyncTest.convert(baseEntityMikroOrmFixture);
      });

      afterEach(() => {
        vi.clearAllMocks();
      });

      it('should call convertToEntity()', () => {
        expect(convertToEntityMock).toHaveBeenCalledOnce();
        expect(convertToEntityMock).toHaveBeenCalledWith(baseEntityMikroOrmFixture, baseEntityFixture);
      });

      it('should return a BaseEntity', () => {
        expect(result).toStrictEqual(baseEntityFixture);
      });
    });
  });
});
