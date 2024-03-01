import { Mocked } from 'vitest';

import { FindQueryHandler } from './FindQueryHandler';
import { ManagerAsync } from '../../domain/manager/ManagerAsync';

interface QueryTest {
  foo: any;
}

interface ModelTest {
  foo: any;
}

describe(FindQueryHandler.name, () => {
  let findManagerMock: Mocked<ManagerAsync<QueryTest, ModelTest[]>>;
  let findQueryHandler: FindQueryHandler<QueryTest, ModelTest>;

  beforeAll(() => {
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

      beforeAll(async () => {
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

      afterAll(() => {
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
