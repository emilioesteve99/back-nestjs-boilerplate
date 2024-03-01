import { Mocked } from 'vitest';

import { CountQueryHandler } from './CountQueryHandler';
import { ManagerAsync } from '../../domain/manager/ManagerAsync';

interface QueryTest {
  foo: any;
}

describe(CountQueryHandler.name, () => {
  let countManagerMock: Mocked<ManagerAsync<QueryTest, number>>;
  let countQueryHandler: CountQueryHandler<QueryTest>;

  beforeAll(() => {
    countManagerMock = {
      manage: vi.fn(),
    };

    countQueryHandler = new CountQueryHandler<QueryTest>(countManagerMock);
  });

  describe('.execute()', () => {
    describe('when called', () => {
      let queryTestFixture: QueryTest;
      let countFixture: number;
      let result: unknown;

      beforeAll(async () => {
        queryTestFixture = {
          foo: 'foo',
        };
        countFixture = 1;

        countManagerMock.manage.mockResolvedValueOnce(countFixture);

        result = await countQueryHandler.execute(queryTestFixture);
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call countManager.manage()', () => {
        expect(countManagerMock.manage).toHaveBeenCalledOnce();
        expect(countManagerMock.manage).toHaveBeenCalledWith(queryTestFixture);
      });

      it('should return number', () => {
        expect(result).toBe(countFixture);
      });
    });
  });
});
