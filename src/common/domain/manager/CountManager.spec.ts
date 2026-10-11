import { Mocked } from 'vitest';
import { CountAdapter } from '../adapter/CountAdapter';
import { CountManager } from './CountManager';

interface QueryTest {
  foo: any;
}

describe(CountManager.name, () => {
  let countAdapterMock: Mocked<CountAdapter<QueryTest>>;
  let countManager: CountManager<QueryTest>;

  beforeEach(() => {
    countAdapterMock = {
      count: vi.fn(),
    };

    countManager = new CountManager(countAdapterMock);
  });

  describe('.manage()', () => {
    describe('when called', () => {
      let queryTestFixture: QueryTest;
      let countFixture: number;
      let result: unknown;

      beforeEach(async () => {
        queryTestFixture = {
          foo: 'foo',
        };
        countFixture = 1;

        countAdapterMock.count.mockResolvedValueOnce(countFixture);

        result = await countManager.manage(queryTestFixture);
      });

      afterEach(() => {
        vi.clearAllMocks();
      });

      it('should call countAdapter.count()', () => {
        expect(countAdapterMock.count).toHaveBeenCalledOnce();
        expect(countAdapterMock.count).toHaveBeenCalledWith(queryTestFixture);
      });

      it('should return number', () => {
        expect(result).toBe(countFixture);
      });
    });
  });
});
