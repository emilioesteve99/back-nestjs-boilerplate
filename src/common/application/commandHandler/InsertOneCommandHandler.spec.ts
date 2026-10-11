import { Mocked } from 'vitest';
import { ManagerAsync } from '../../domain/manager/ManagerAsync';
import { InsertOneCommandHandler } from './InsertOneCommandHandler';

interface CommandTest {
  foo: any;
}

interface ModelTest {
  foo: any;
}

describe(InsertOneCommandHandler.name, () => {
  let insertOneManagerMock: Mocked<ManagerAsync<CommandTest, ModelTest>>;
  let insertOneCommandHandler: InsertOneCommandHandler<CommandTest, ModelTest>;

  beforeEach(() => {
    insertOneManagerMock = {
      manage: vi.fn(),
    };

    insertOneCommandHandler = new InsertOneCommandHandler<CommandTest, ModelTest>(insertOneManagerMock);
  });

  describe('.execute()', () => {
    describe('when called', () => {
      let commandTestFixture: CommandTest;
      let modelTestFixture: ModelTest;
      let result: unknown;

      beforeEach(async () => {
        commandTestFixture = {
          foo: 'foo',
        };
        modelTestFixture = {
          foo: 'foo',
        };

        insertOneManagerMock.manage.mockResolvedValueOnce(modelTestFixture);

        result = await insertOneCommandHandler.execute(commandTestFixture);
      });

      afterEach(() => {
        vi.clearAllMocks();
      });

      it('should call insertOneManager.manage()', () => {
        expect(insertOneManagerMock.manage).toHaveBeenCalledOnce();
        expect(insertOneManagerMock.manage).toHaveBeenCalledWith(commandTestFixture);
      });

      it('should return a ModelTest', () => {
        expect(result).toBe(modelTestFixture);
      });
    });
  });
});
