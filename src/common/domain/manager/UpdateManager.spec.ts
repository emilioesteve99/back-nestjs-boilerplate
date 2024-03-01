import { Mocked } from 'vitest';

import { UpdateManager } from './UpdateManager';
import { UpdateAdapter } from '../adapter/UpdateAdapter';

interface CommandTest {
  foo: any;
}

describe(UpdateManager.name, () => {
  let updateAdapterMock: Mocked<UpdateAdapter<CommandTest>>;
  let updateManager: UpdateManager<CommandTest>;

  beforeAll(() => {
    updateAdapterMock = {
      update: vi.fn(),
    };

    updateManager = new UpdateManager(updateAdapterMock);
  });

  describe('.manage()', () => {
    describe('when called', () => {
      let commandTestFixture: CommandTest;

      beforeAll(async () => {
        commandTestFixture = { foo: 'foo' };

        await updateManager.manage(commandTestFixture);
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call updateAdapter.update()', () => {
        expect(updateAdapterMock.update).toHaveBeenCalledOnce();
        expect(updateAdapterMock.update).toHaveBeenCalledWith(commandTestFixture);
      });
    });
  });
});
