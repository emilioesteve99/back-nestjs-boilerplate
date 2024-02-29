import { EntityRepository, ObjectQuery } from '@mikro-orm/core';
import { Mocked } from 'vitest';

import { CountMikroOrmAdapter } from './CountMikroOrmAdapter';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';

interface QueryTest {
  foo: any;
}

interface ModelTest {
  foo: any;
}

describe(CountMikroOrmAdapter.name, () => {
  let entityRepositoryMock: Mocked<EntityRepository<ModelTest>>;
  let countQueryToFindQueryMikroOrmConverterAsyncMock: Mocked<ConverterAsync<QueryTest, ObjectQuery<ModelTest>>>;
  let countMikroOrmAdapter: CountMikroOrmAdapter<QueryTest, ModelTest>;

  beforeAll(() => {
    entityRepositoryMock = {
      count: vi.fn(),
    } as Partial<Mocked<EntityRepository<ModelTest>>> as Mocked<EntityRepository<ModelTest>>;

    countQueryToFindQueryMikroOrmConverterAsyncMock = {
      convert: vi.fn(),
    };

    countMikroOrmAdapter = new CountMikroOrmAdapter<QueryTest, ModelTest>(
      entityRepositoryMock,
      countQueryToFindQueryMikroOrmConverterAsyncMock,
    );
  });

  describe('.delete()', () => {
    describe('when called', () => {
      let queryTestFixture: QueryTest;
      let findQueryMikroOrmTestFixture: ObjectQuery<ModelTest>;
      let countResultFixture: number;
      let result: unknown;

      beforeAll(async () => {
        queryTestFixture = {
          foo: 'foo',
        };
        findQueryMikroOrmTestFixture = {
          foo: 'foo',
        };
        countResultFixture = 1;

        countQueryToFindQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(findQueryMikroOrmTestFixture);

        entityRepositoryMock.count.mockResolvedValueOnce(countResultFixture);

        result = await countMikroOrmAdapter.count(queryTestFixture);
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call countQueryToFindQueryMikroOrmConverterAsync.convert()', () => {
        expect(countQueryToFindQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledOnce();
        expect(countQueryToFindQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(queryTestFixture);
      });

      it('should call entityRepository.count()', () => {
        expect(entityRepositoryMock.count).toHaveBeenCalledOnce();
        expect(entityRepositoryMock.count).toHaveBeenCalledWith(findQueryMikroOrmTestFixture);
      });

      it('should return a number', () => {
        expect(result).toBe(countResultFixture);
      });
    });
  });
});
