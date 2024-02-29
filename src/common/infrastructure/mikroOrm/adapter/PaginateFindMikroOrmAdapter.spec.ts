import { EntityRepository, FindOptions, ObjectQuery } from '@mikro-orm/core';
import { Mocked } from 'vitest';

import { PaginateFindMikroOrmAdapter } from './PaginateFindMikroOrmAdapter';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { Pagination } from '../../../domain/model/Pagination';

interface QueryTest {
  foo: any;
}

interface ModelTest {
  foo: any;
}

describe(PaginateFindMikroOrmAdapter.name, () => {
  let entityRepositoryMock: Mocked<EntityRepository<ModelTest>>;
  let queryTestToFindQueryMikroOrmConverterAsyncMock: Mocked<ConverterAsync<QueryTest, ObjectQuery<ModelTest>>>;
  let queryTestToFindOptionsQueryMikroOrmConverterAsyncMock: Mocked<ConverterAsync<QueryTest, FindOptions<ModelTest>>>;
  let modelsDbToPaginationModelConverterAsyncMock: Mocked<
    ConverterAsync<ModelTest[], Pagination<ModelTest>, { query: QueryTest; totalItems: number }>
  >;
  let paginateFindMikroOrmAdapter: PaginateFindMikroOrmAdapter<QueryTest, ModelTest, ModelTest>;

  beforeAll(() => {
    entityRepositoryMock = {
      findAndCount: vi.fn(),
    } as Partial<Mocked<EntityRepository<ModelTest>>> as Mocked<EntityRepository<ModelTest>>;

    queryTestToFindQueryMikroOrmConverterAsyncMock = {
      convert: vi.fn(),
    };

    queryTestToFindOptionsQueryMikroOrmConverterAsyncMock = {
      convert: vi.fn(),
    };

    modelsDbToPaginationModelConverterAsyncMock = {
      convert: vi.fn(),
    };

    paginateFindMikroOrmAdapter = new PaginateFindMikroOrmAdapter<QueryTest, ModelTest, ModelTest>(
      entityRepositoryMock,
      queryTestToFindQueryMikroOrmConverterAsyncMock,
      queryTestToFindOptionsQueryMikroOrmConverterAsyncMock,
      modelsDbToPaginationModelConverterAsyncMock,
    );
  });

  describe('.find()', () => {
    describe('when called', () => {
      let queryTestFixture: QueryTest;
      let findQueryMikroOrmTestFixture: ObjectQuery<ModelTest>;
      let findOptionsQueryMikroOrmTestFixture: FindOptions<ModelTest>;
      let modelTestFixtures: ModelTest[];
      let totalItemsFixture: number;
      let paginationModelTestFixture: Pagination<ModelTest>;
      let result: unknown;

      beforeAll(async () => {
        queryTestFixture = {
          foo: 'foo',
        };
        findQueryMikroOrmTestFixture = {};
        findOptionsQueryMikroOrmTestFixture = {};
        modelTestFixtures = [
          {
            foo: 'foo',
          },
        ];
        totalItemsFixture = 0;
        paginationModelTestFixture = {
          items: modelTestFixtures,
          meta: {
            currentPage: 0,
            itemCount: 0,
            itemsPerPage: 0,
            totalItems: 0,
            totalPages: 0,
          },
        };

        queryTestToFindQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(findQueryMikroOrmTestFixture);
        queryTestToFindOptionsQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          findOptionsQueryMikroOrmTestFixture,
        );
        entityRepositoryMock.findAndCount.mockResolvedValueOnce([modelTestFixtures, totalItemsFixture]);
        modelsDbToPaginationModelConverterAsyncMock.convert.mockResolvedValueOnce(paginationModelTestFixture);

        result = await paginateFindMikroOrmAdapter.paginateFind(queryTestFixture);
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call queryTestToFindQueryMikroOrmConverterAsync.convert()', () => {
        expect(queryTestToFindQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledOnce();
        expect(queryTestToFindQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(queryTestFixture);
      });

      it('should call queryTestToFindOptionsQueryMikroOrmConverterAsync.convert()', () => {
        expect(queryTestToFindOptionsQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledOnce();
        expect(queryTestToFindOptionsQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(queryTestFixture);
      });

      it('should call modelsDbToPaginationModelConverterAsync.convert()', () => {
        expect(modelsDbToPaginationModelConverterAsyncMock.convert).toHaveBeenCalledOnce();
        expect(modelsDbToPaginationModelConverterAsyncMock.convert).toHaveBeenCalledWith(modelTestFixtures, {
          query: queryTestFixture,
          totalItems: totalItemsFixture,
        });
      });

      it('should return Pagination<ModelTest>', () => {
        expect(result).toStrictEqual(paginationModelTestFixture);
      });
    });
  });
});
