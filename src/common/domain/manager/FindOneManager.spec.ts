import { Mocked } from 'vitest';

import { FindOneManager } from './FindOneManager';
import { FindOneAdapter } from '../adapter/FindOneAdapter';

interface QueryTest {
  foo: any;
}

interface ModelTest {
  foo: any;
}

describe(FindOneManager.name, () => {
  let findOneAdapterMock: Mocked<FindOneAdapter<QueryTest, ModelTest>>;
  let findOneManager: FindOneManager<QueryTest, ModelTest>;

  beforeAll(() => {
    findOneAdapterMock = {
      findOne: vi.fn(),
    };

    findOneManager = new FindOneManager(findOneAdapterMock);
  });

  describe('.manage()', () => {
    describe('when called', () => {
      let queryTestFixture: QueryTest;
      let modelTestFixture: ModelTest;
      let result: unknown;

      beforeAll(async () => {
        queryTestFixture = {
          foo: 'foo',
        };
        modelTestFixture = {
          foo: 'foo',
        };

        findOneAdapterMock.findOne.mockResolvedValueOnce(modelTestFixture);

        result = await findOneManager.manage(queryTestFixture);
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call findOneAdapter.findOne()', () => {
        expect(findOneAdapterMock.findOne).toHaveBeenCalledOnce();
        expect(findOneAdapterMock.findOne).toHaveBeenCalledWith(queryTestFixture);
      });

      it('should return TModel or undefined', () => {
        expect(result).toBe(modelTestFixture);
      });
    });
  });
});
