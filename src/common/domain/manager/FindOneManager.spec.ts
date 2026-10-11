import { Mocked } from 'vitest';
import { FindOneAdapter } from '../adapter/FindOneAdapter';
import { FindOneManager } from './FindOneManager';

interface QueryTest {
  foo: any;
}

interface ModelTest {
  foo: any;
}

describe(FindOneManager.name, () => {
  let findOneAdapterMock: Mocked<FindOneAdapter<QueryTest, ModelTest>>;
  let findOneManager: FindOneManager<QueryTest, ModelTest>;

  beforeEach(() => {
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

      beforeEach(async () => {
        queryTestFixture = {
          foo: 'foo',
        };
        modelTestFixture = {
          foo: 'foo',
        };

        findOneAdapterMock.findOne.mockResolvedValueOnce(modelTestFixture);

        result = await findOneManager.manage(queryTestFixture);
      });

      afterEach(() => {
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
