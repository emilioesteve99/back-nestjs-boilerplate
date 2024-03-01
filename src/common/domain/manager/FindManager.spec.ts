import { Mocked } from 'vitest';

import { FindManager } from './FindManager';
import { FindAdapter } from '../adapter/FindAdapter';

interface QueryTest {
  foo: any;
}

interface ModelTest {
  foo: any;
}

describe(FindManager.name, () => {
  let findAdapterMock: Mocked<FindAdapter<QueryTest, ModelTest>>;
  let findManager: FindManager<QueryTest, ModelTest>;

  beforeAll(() => {
    findAdapterMock = {
      find: vi.fn(),
    };

    findManager = new FindManager(findAdapterMock);
  });

  describe('.manage()', () => {
    describe('when called', () => {
      let queryTestFixture: QueryTest;
      let modelTestFixtures: ModelTest[];
      let result: unknown;

      beforeAll(async () => {
        queryTestFixture = {
          foo: 'foo',
        };
        modelTestFixtures = [
          {
            foo: 'foo',
          },
        ];

        findAdapterMock.find.mockResolvedValueOnce(modelTestFixtures);

        result = await findManager.manage(queryTestFixture);
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call findAdapter.find()', () => {
        expect(findAdapterMock.find).toHaveBeenCalledOnce();
        expect(findAdapterMock.find).toHaveBeenCalledWith(queryTestFixture);
      });

      it('should return ModelTest[]', () => {
        expect(result).toBe(modelTestFixtures);
      });
    });
  });
});
