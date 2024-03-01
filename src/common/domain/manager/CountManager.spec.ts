import { Mocked } from 'vitest';

import { CountManager } from './CountManager';
import { CountAdapter } from '../adapter/CountAdapter';

interface QueryTest {
  foo: any;
}

describe(CountManager.name, () => {
  let countAdapterMock: Mocked<CountAdapter<QueryTest>>;
  let countManager: CountManager<QueryTest>;

  beforeAll(() => {
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

      beforeAll(async () => {
        queryTestFixture = {
          foo: 'foo',
        };
        countFixture = 1;

        countAdapterMock.count.mockResolvedValueOnce(countFixture);

        result = await countManager.manage(queryTestFixture);
      });

      afterAll(() => {
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
