import { Mocked } from 'vitest';
import { UpdateAdapter } from '../adapter/UpdateAdapter';
import { UpdateManager } from './UpdateManager';

interface CommandTest {
  foo: any;
}

describe(UpdateManager.name, () => {
  let updateAdapterMock: Mocked<UpdateAdapter<CommandTest>>;
  let updateManager: UpdateManager<CommandTest>;

  beforeEach(() => {
    updateAdapterMock = {
      update: vi.fn(),
    };

    updateManager = new UpdateManager(updateAdapterMock);
  });

  describe('.manage()', () => {
    describe('when called', () => {
      let commandTestFixture: CommandTest;

      beforeEach(async () => {
        commandTestFixture = { foo: 'foo' };

        await updateManager.manage(commandTestFixture);
      });

      afterEach(() => {
        vi.clearAllMocks();
      });

      it('should call updateAdapter.update()', () => {
        expect(updateAdapterMock.update).toHaveBeenCalledOnce();
        expect(updateAdapterMock.update).toHaveBeenCalledWith(commandTestFixture);
      });
    });
  });
});
