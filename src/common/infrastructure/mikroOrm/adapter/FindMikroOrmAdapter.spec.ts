import { EntityRepository, FindOptions, ObjectQuery } from '@mikro-orm/core';
import { Mocked } from 'vitest';

import { FindMikroOrmAdapter } from './FindMikroOrmAdapter';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';

interface QueryTest {
  foo: any;
}

interface ModelTest {
  foo: any;
}

describe(FindMikroOrmAdapter.name, () => {
  let entityRepositoryMock: Mocked<EntityRepository<ModelTest>>;
  let queryTestToQueryMikroOrmConverterAsyncMock: Mocked<ConverterAsync<QueryTest, ObjectQuery<ModelTest>>>;
  let queryTestToFindOptionsQueryMikroOrmConverterAsyncMock: Mocked<ConverterAsync<QueryTest, FindOptions<ModelTest>>>;
  let modelDbToModelConverterAsyncMock: Mocked<ConverterAsync<ModelTest, ModelTest>>;
  let findMikroOrmAdapter: FindMikroOrmAdapter<QueryTest, ModelTest, ModelTest>;

  beforeAll(() => {
    entityRepositoryMock = {
      find: vi.fn(),
    } as Partial<Mocked<EntityRepository<ModelTest>>> as Mocked<EntityRepository<ModelTest>>;

    queryTestToQueryMikroOrmConverterAsyncMock = {
      convert: vi.fn(),
    };

    queryTestToFindOptionsQueryMikroOrmConverterAsyncMock = {
      convert: vi.fn(),
    };

    modelDbToModelConverterAsyncMock = {
      convert: vi.fn(),
    };

    findMikroOrmAdapter = new FindMikroOrmAdapter<QueryTest, ModelTest, ModelTest>(
      entityRepositoryMock,
      queryTestToQueryMikroOrmConverterAsyncMock,
      queryTestToFindOptionsQueryMikroOrmConverterAsyncMock,
      modelDbToModelConverterAsyncMock,
    );
  });

  describe('.find()', () => {
    describe('when called', () => {
      let queryTestFixture: QueryTest;
      let findQueryMikroOrmTestFixture: ObjectQuery<ModelTest>;
      let findOptionsQueryMikroOrmTestFixture: FindOptions<ModelTest>;
      let modelTestFixture: ModelTest;
      let modelTestFixtures: ModelTest[];
      let result: unknown;

      beforeAll(async () => {
        queryTestFixture = {
          foo: 'foo',
        };
        findQueryMikroOrmTestFixture = {};
        findOptionsQueryMikroOrmTestFixture = {};
        modelTestFixture = {
          foo: 'foo',
        };
        modelTestFixtures = [modelTestFixture];

        queryTestToQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(findQueryMikroOrmTestFixture);
        queryTestToFindOptionsQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          findOptionsQueryMikroOrmTestFixture,
        );
        modelDbToModelConverterAsyncMock.convert.mockResolvedValueOnce(modelTestFixture);
        entityRepositoryMock.find.mockResolvedValueOnce(modelTestFixtures);

        result = await findMikroOrmAdapter.find(queryTestFixture);
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call queryTestToQueryMikroOrmConverterAsync.convert()', () => {
        expect(queryTestToQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledOnce();
        expect(queryTestToQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(queryTestFixture);
      });

      it('should call queryTestToFindOptionsQueryMikroOrmConverterAsync.convert()', () => {
        expect(queryTestToFindOptionsQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledOnce();
        expect(queryTestToFindOptionsQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(queryTestFixture);
      });

      it('should call modelDbToModelConverterAsync.convert()', () => {
        expect(modelDbToModelConverterAsyncMock.convert).toHaveBeenCalledOnce();
        expect(modelDbToModelConverterAsyncMock.convert).toHaveBeenCalledWith(modelTestFixture);
      });

      it('should return ModelTest[]', () => {
        expect(result).toStrictEqual(modelTestFixtures);
      });
    });
  });
});
