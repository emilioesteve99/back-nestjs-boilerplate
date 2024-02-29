import { Mocked } from 'vitest';

import { PaginateFindManager } from './PaginateFindManager';
import { PaginateFindAdapter } from '../adapter/PaginateFindAdapter';
import { Pagination } from '../model/Pagination';

interface QueryTest {
  foo: any;
}

interface ModelTest {
  foo: any;
}

describe(PaginateFindManager.name, () => {
  let paginateFindAdapterMock: Mocked<PaginateFindAdapter<QueryTest, ModelTest>>;
  let paginateFindManager: PaginateFindManager<QueryTest, ModelTest>;

  beforeAll(() => {
    paginateFindAdapterMock = {
      paginateFind: vi.fn(),
    };

    paginateFindManager = new PaginateFindManager(paginateFindAdapterMock);
  });

  describe('.manage()', () => {
    describe('when called', () => {
      let queryTestFixture: QueryTest;
      let paginationModelTestFixture: Pagination<ModelTest>;
      let result: unknown;

      beforeAll(async () => {
        queryTestFixture = {
          foo: 'foo',
        };
        paginationModelTestFixture = {
          items: [
            {
              foo: 'foo',
            },
          ],
          meta: {
            currentPage: 0,
            itemCount: 0,
            itemsPerPage: 0,
            totalItems: 0,
            totalPages: 0,
          },
        };

        paginateFindAdapterMock.paginateFind.mockResolvedValueOnce(paginationModelTestFixture);

        result = await paginateFindManager.manage(queryTestFixture);
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call paginateFindAdapter.paginateFind()', () => {
        expect(paginateFindAdapterMock.paginateFind).toHaveBeenCalledOnce();
        expect(paginateFindAdapterMock.paginateFind).toHaveBeenCalledWith(queryTestFixture);
      });

      it('should return Pagination<ModelTest>', () => {
        expect(result).toBe(paginationModelTestFixture);
      });
    });
  });
});
