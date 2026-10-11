import { Mocked } from 'vitest';
import { ManagerAsync } from '../../domain/manager/ManagerAsync';
import { FindOneQueryHandler } from './FindOneQueryHandler';

interface QueryTest {
  foo: any;
}

interface ModelTest {
  foo: any;
}

describe(FindOneQueryHandler.name, () => {
  let findOneManagerMock: Mocked<ManagerAsync<QueryTest, ModelTest | undefined>>;
  let findOneQueryHandler: FindOneQueryHandler<QueryTest, ModelTest>;

  beforeEach(() => {
    findOneManagerMock = {
      manage: vi.fn(),
    };

    findOneQueryHandler = new FindOneQueryHandler<QueryTest, ModelTest>(findOneManagerMock);
  });

  describe('.execute()', () => {
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

        findOneManagerMock.manage.mockResolvedValueOnce(modelTestFixture);

        result = await findOneQueryHandler.execute(queryTestFixture);
      });

      afterEach(() => {
        vi.clearAllMocks();
      });

      it('should call findOneManager.manage()', () => {
        expect(findOneManagerMock.manage).toHaveBeenCalledOnce();
        expect(findOneManagerMock.manage).toHaveBeenCalledWith(queryTestFixture);
      });

      it('should return TModel or undefined', () => {
        expect(result).toBe(modelTestFixture);
      });
    });
  });
});
