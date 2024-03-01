import { Mocked } from 'vitest';

import { InsertCommandHandler } from './InsertCommandHandler';
import { ManagerAsync } from '../../domain/manager/ManagerAsync';

interface CommandTest {
  foo: any;
}

interface ModelTest {
  foo: any;
}

describe(InsertCommandHandler.name, () => {
  let insertManagerMock: Mocked<ManagerAsync<CommandTest, ModelTest[]>>;
  let insertCommandHandler: InsertCommandHandler<CommandTest, ModelTest>;

  beforeAll(() => {
    insertManagerMock = {
      manage: vi.fn(),
    };

    insertCommandHandler = new InsertCommandHandler<CommandTest, ModelTest>(insertManagerMock);
  });

  describe('.execute()', () => {
    describe('when called', () => {
      let commandTestFixture: CommandTest;
      let modelTestFixtures: ModelTest[];
      let result: unknown;

      beforeAll(async () => {
        commandTestFixture = {
          foo: 'foo',
        };
        modelTestFixtures = [
          {
            foo: 'foo',
          },
        ];

        insertManagerMock.manage.mockResolvedValueOnce(modelTestFixtures);

        result = await insertCommandHandler.execute(commandTestFixture);
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call insertOneManager.manage()', () => {
        expect(insertManagerMock.manage).toHaveBeenCalledOnce();
        expect(insertManagerMock.manage).toHaveBeenCalledWith(commandTestFixture);
      });

      it('should return a ModelTest', () => {
        expect(result).toBe(modelTestFixtures);
      });
    });
  });
});
