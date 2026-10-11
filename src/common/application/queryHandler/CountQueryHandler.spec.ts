import { Mocked } from 'vitest';
import { ManagerAsync } from '../../domain/manager/ManagerAsync';
import { CountQueryHandler } from './CountQueryHandler';

interface QueryTest {
  foo: any;
}

describe(CountQueryHandler.name, () => {
  let countManagerMock: Mocked<ManagerAsync<QueryTest, number>>;
  let countQueryHandler: CountQueryHandler<QueryTest>;

  beforeEach(() => {
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

      beforeEach(async () => {
        queryTestFixture = {
          foo: 'foo',
        };
        countFixture = 1;

        countManagerMock.manage.mockResolvedValueOnce(countFixture);

        result = await countQueryHandler.execute(queryTestFixture);
      });

      afterEach(() => {
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
