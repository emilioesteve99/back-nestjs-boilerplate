import { Mocked } from 'vitest';

import { DeleteManager } from './DeleteManager';
import { DeleteAdapter } from '../adapter/DeleteAdapter';

interface CommandTest {
  foo: any;
}

describe(DeleteManager.name, () => {
  let deleteAdapterMock: Mocked<DeleteAdapter<CommandTest>>;
  let deleteManager: DeleteManager<CommandTest>;

  beforeAll(() => {
    deleteAdapterMock = {
      delete: vi.fn(),
    };

    deleteManager = new DeleteManager(deleteAdapterMock);
  });

  describe('.manage()', () => {
    describe('when called', () => {
      let commandTestFixture: CommandTest;

      beforeAll(async () => {
        commandTestFixture = { foo: 'foo' };

        await deleteManager.manage(commandTestFixture);
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call deleteAdapter.delete()', () => {
        expect(deleteAdapterMock.delete).toHaveBeenCalledOnce();
        expect(deleteAdapterMock.delete).toHaveBeenCalledWith(commandTestFixture);
      });
    });
  });
});
