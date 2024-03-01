import { EntityRepository, FindOneOptions, ObjectQuery } from '@mikro-orm/core';
import { Mocked } from 'vitest';

import { FindOneMikroOrmAdapter } from './FindOneMikroOrmAdapter';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';

interface QueryTest {
  foo: any;
}

interface ModelTest {
  foo: any;
}

describe(FindOneMikroOrmAdapter.name, () => {
  let entityRepositoryMock: Mocked<EntityRepository<ModelTest>>;
  let queryTestToFindOneQueryMikroOrmConverterAsyncMock: Mocked<ConverterAsync<QueryTest, ObjectQuery<ModelTest>>>;
  let queryTestToFindOneOptionsQueryMikroOrmConverterAsyncMock: Mocked<
    ConverterAsync<QueryTest, FindOneOptions<ModelTest>>
  >;
  let modelDbToModelConverterAsyncMock: Mocked<ConverterAsync<ModelTest, ModelTest>>;
  let findOneMikroOrmAdapter: FindOneMikroOrmAdapter<QueryTest, ModelTest, ModelTest>;

  beforeAll(() => {
    entityRepositoryMock = {
      findOne: vi.fn(),
    } as Partial<Mocked<EntityRepository<ModelTest>>> as Mocked<EntityRepository<ModelTest>>;

    queryTestToFindOneQueryMikroOrmConverterAsyncMock = {
      convert: vi.fn(),
    };

    queryTestToFindOneOptionsQueryMikroOrmConverterAsyncMock = {
      convert: vi.fn(),
    };

    modelDbToModelConverterAsyncMock = {
      convert: vi.fn(),
    };

    findOneMikroOrmAdapter = new FindOneMikroOrmAdapter<QueryTest, ModelTest, ModelTest>(
      entityRepositoryMock,
      queryTestToFindOneQueryMikroOrmConverterAsyncMock,
      queryTestToFindOneOptionsQueryMikroOrmConverterAsyncMock,
      modelDbToModelConverterAsyncMock,
    );
  });

  describe('.findOne()', () => {
    describe('when called and entityRepository.findOne() returns null', () => {
      let queryTestFixture: QueryTest;
      let findOneQueryMikroOrmTestFixture: ObjectQuery<ModelTest>;
      let findOneOptionsQueryMikroOrmTestFixture: FindOneOptions<ModelTest>;
      let modelTestFixture: ModelTest | null;
      let result: unknown;

      beforeAll(async () => {
        queryTestFixture = {
          foo: 'foo',
        };
        findOneQueryMikroOrmTestFixture = {};
        findOneOptionsQueryMikroOrmTestFixture = {};
        modelTestFixture = null;

        queryTestToFindOneQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          findOneQueryMikroOrmTestFixture,
        );
        queryTestToFindOneOptionsQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          findOneOptionsQueryMikroOrmTestFixture,
        );
        entityRepositoryMock.findOne.mockResolvedValueOnce(modelTestFixture);

        result = await findOneMikroOrmAdapter.findOne(queryTestFixture);
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call queryTestToFindOneQueryMikroOrmConverterAsync.convert()', () => {
        expect(queryTestToFindOneQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledOnce();
        expect(queryTestToFindOneQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(queryTestFixture);
      });

      it('should call queryTestToFindOneOptionsQueryMikroOrmConverterAsync.convert()', () => {
        expect(queryTestToFindOneOptionsQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledOnce();
        expect(queryTestToFindOneOptionsQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(queryTestFixture);
      });

      it('should return undefined', () => {
        expect(result).toBeUndefined();
      });
    });

    describe('when called and entityRepository.findOne() returns ModelTest', () => {
      let queryTestFixture: QueryTest;
      let findOneQueryMikroOrmTestFixture: ObjectQuery<ModelTest>;
      let findOneOptionsQueryMikroOrmTestFixture: FindOneOptions<ModelTest>;
      let modelTestFixture: ModelTest;
      let result: unknown;

      beforeAll(async () => {
        queryTestFixture = {
          foo: 'foo',
        };
        findOneQueryMikroOrmTestFixture = {};
        findOneOptionsQueryMikroOrmTestFixture = {};
        modelTestFixture = {
          foo: 'foo',
        };

        queryTestToFindOneQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          findOneQueryMikroOrmTestFixture,
        );
        queryTestToFindOneOptionsQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          findOneOptionsQueryMikroOrmTestFixture,
        );
        modelDbToModelConverterAsyncMock.convert.mockResolvedValueOnce(modelTestFixture);
        entityRepositoryMock.findOne.mockResolvedValueOnce(modelTestFixture);

        result = await findOneMikroOrmAdapter.findOne(queryTestFixture);
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call queryTestToFindOneQueryMikroOrmConverterAsync.convert()', () => {
        expect(queryTestToFindOneQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledOnce();
        expect(queryTestToFindOneQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(queryTestFixture);
      });

      it('should call queryTestToFindOneOptionsQueryMikroOrmConverterAsync.convert()', () => {
        expect(queryTestToFindOneOptionsQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledOnce();
        expect(queryTestToFindOneOptionsQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(queryTestFixture);
      });

      it('should call modelDbToModelConverterAsync.convert()', () => {
        expect(modelDbToModelConverterAsyncMock.convert).toHaveBeenCalledOnce();
        expect(modelDbToModelConverterAsyncMock.convert).toHaveBeenCalledWith(modelTestFixture);
      });

      it('should return ModelTest', () => {
        expect(result).toStrictEqual(modelTestFixture);
      });
    });
  });
});
