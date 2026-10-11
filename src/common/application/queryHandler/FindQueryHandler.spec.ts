import { Mocked } from 'vitest';
import { ManagerAsync } from '../../domain/manager/ManagerAsync';
import { FindQueryHandler } from './FindQueryHandler';

interface QueryTest {
  foo: any;
}

interface ModelTest {
  foo: any;
}

describe(FindQueryHandler.name, () => {
  let findManagerMock: Mocked<ManagerAsync<QueryTest, ModelTest[]>>;
  let findQueryHandler: FindQueryHandler<QueryTest, ModelTest>;

  beforeEach(() => {
    findManagerMock = {
      manage: vi.fn(),
    };

    findQueryHandler = new FindQueryHandler(findManagerMock);
  });

  describe('.execute()', () => {
    describe('when called', () => {
      let queryTestFixture: QueryTest;
      let modelTestFixtures: ModelTest[];
      let result: unknown;

      beforeEach(async () => {
        queryTestFixture = {
          foo: 'foo',
        };
        modelTestFixtures = [
          {
            foo: 'foo',
          },
        ];

        findManagerMock.manage.mockResolvedValueOnce(modelTestFixtures);

        result = await findQueryHandler.execute(queryTestFixture);
      });

      afterEach(() => {
        vi.clearAllMocks();
      });

      it('should call findManager.manage()', () => {
        expect(findManagerMock.manage).toHaveBeenCalledOnce();
        expect(findManagerMock.manage).toHaveBeenCalledWith(queryTestFixture);
      });

      it('should return TModel or undefined', () => {
        expect(result).toBe(modelTestFixtures);
      });
    });
  });
});
