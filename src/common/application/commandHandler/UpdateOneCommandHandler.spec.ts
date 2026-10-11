import { Mocked } from 'vitest';
import { ManagerAsync } from '../../domain/manager/ManagerAsync';
import { UpdateOneCommandHandler } from './UpdateOneCommandHandler';

interface CommandTest {
  foo: any;
}

describe(UpdateOneCommandHandler.name, () => {
  let updateOneManagerMock: Mocked<ManagerAsync<CommandTest, void>>;
  let updateOneCommandHandler: UpdateOneCommandHandler<CommandTest>;

  beforeEach(() => {
    updateOneManagerMock = {
      manage: vi.fn(),
    };

    updateOneCommandHandler = new UpdateOneCommandHandler<CommandTest>(updateOneManagerMock);
  });

  describe('.execute()', () => {
    describe('when called', () => {
      let commandTestFixture: CommandTest;

      beforeEach(async () => {
        commandTestFixture = {
          foo: 'foo',
        };

        await updateOneCommandHandler.execute(commandTestFixture);
      });

      afterEach(() => {
        vi.clearAllMocks();
      });

      it('should call updateManager.manage()', () => {
        expect(updateOneManagerMock.manage).toHaveBeenCalledOnce();
        expect(updateOneManagerMock.manage).toHaveBeenCalledWith(commandTestFixture);
      });
    });
  });
});
