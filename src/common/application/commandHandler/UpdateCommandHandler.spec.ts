import { Mocked } from 'vitest';
import { ManagerAsync } from '../../domain/manager/ManagerAsync';
import { UpdateCommandHandler } from './UpdateCommandHandler';

interface CommandTest {
  foo: any;
}

describe(UpdateCommandHandler.name, () => {
  let updateManagerMock: Mocked<ManagerAsync<CommandTest, void>>;
  let updateCommandHandler: UpdateCommandHandler<CommandTest>;

  beforeEach(() => {
    updateManagerMock = {
      manage: vi.fn(),
    };

    updateCommandHandler = new UpdateCommandHandler<CommandTest>(updateManagerMock);
  });

  describe('.execute()', () => {
    describe('when called', () => {
      let commandTestFixture: CommandTest;

      beforeEach(async () => {
        commandTestFixture = {
          foo: 'foo',
        };

        await updateCommandHandler.execute(commandTestFixture);
      });

      afterEach(() => {
        vi.clearAllMocks();
      });

      it('should call updateManager.manage()', () => {
        expect(updateManagerMock.manage).toHaveBeenCalledOnce();
        expect(updateManagerMock.manage).toHaveBeenCalledWith(commandTestFixture);
      });
    });
  });
});
