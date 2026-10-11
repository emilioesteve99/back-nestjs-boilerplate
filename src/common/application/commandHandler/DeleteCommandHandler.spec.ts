import { Mocked } from 'vitest';
import { ManagerAsync } from '../../domain/manager/ManagerAsync';
import { DeleteCommandHandler } from './DeleteCommandHandler';

interface CommandTest {
  foo: any;
}

describe(DeleteCommandHandler.name, () => {
  let deleteManagerMock: Mocked<ManagerAsync<CommandTest, void>>;
  let deleteCommandHandler: DeleteCommandHandler<CommandTest>;

  beforeEach(() => {
    deleteManagerMock = {
      manage: vi.fn(),
    };

    deleteCommandHandler = new DeleteCommandHandler<CommandTest>(deleteManagerMock);
  });

  describe('.execute()', () => {
    describe('when called', () => {
      let commandTestFixture: CommandTest;

      beforeEach(async () => {
        commandTestFixture = {
          foo: 'foo',
        };

        await deleteCommandHandler.execute(commandTestFixture);
      });

      afterEach(() => {
        vi.clearAllMocks();
      });

      it('should call deleteManager.manage()', () => {
        expect(deleteManagerMock.manage).toHaveBeenCalledOnce();
        expect(deleteManagerMock.manage).toHaveBeenCalledWith(commandTestFixture);
      });
    });
  });
});
