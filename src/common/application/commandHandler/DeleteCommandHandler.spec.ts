import { Mocked } from 'vitest';

import { DeleteCommandHandler } from './DeleteCommandHandler';
import { ManagerAsync } from '../../domain/manager/ManagerAsync';

interface CommandTest {
  foo: any;
}

describe(DeleteCommandHandler.name, () => {
  let deleteManagerMock: Mocked<ManagerAsync<CommandTest, void>>;
  let deleteCommandHandler: DeleteCommandHandler<CommandTest>;

  beforeAll(() => {
    deleteManagerMock = {
      manage: vi.fn(),
    };

    deleteCommandHandler = new DeleteCommandHandler<CommandTest>(deleteManagerMock);
  });

  describe('.execute()', () => {
    describe('when called', () => {
      let commandTestFixture: CommandTest;

      beforeAll(async () => {
        commandTestFixture = {
          foo: 'foo',
        };

        await deleteCommandHandler.execute(commandTestFixture);
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call deleteManager.manage()', () => {
        expect(deleteManagerMock.manage).toHaveBeenCalledOnce();
        expect(deleteManagerMock.manage).toHaveBeenCalledWith(commandTestFixture);
      });
    });
  });
});
