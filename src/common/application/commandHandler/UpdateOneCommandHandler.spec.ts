import { Mocked } from 'vitest';

import { UpdateOneCommandHandler } from './UpdateOneCommandHandler';
import { ManagerAsync } from '../../domain/manager/ManagerAsync';

interface CommandTest {
  foo: any;
}

describe(UpdateOneCommandHandler.name, () => {
  let updateOneManagerMock: Mocked<ManagerAsync<CommandTest, void>>;
  let updateOneCommandHandler: UpdateOneCommandHandler<CommandTest>;

  beforeAll(() => {
    updateOneManagerMock = {
      manage: vi.fn(),
    };

    updateOneCommandHandler = new UpdateOneCommandHandler<CommandTest>(updateOneManagerMock);
  });

  describe('.execute()', () => {
    describe('when called', () => {
      let commandTestFixture: CommandTest;

      beforeAll(async () => {
        commandTestFixture = {
          foo: 'foo',
        };

        await updateOneCommandHandler.execute(commandTestFixture);
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call updateManager.manage()', () => {
        expect(updateOneManagerMock.manage).toHaveBeenCalledOnce();
        expect(updateOneManagerMock.manage).toHaveBeenCalledWith(commandTestFixture);
      });
    });
  });
});
