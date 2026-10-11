import { Mocked } from 'vitest';
import { DeleteAdapter } from '../adapter/DeleteAdapter';
import { DeleteManager } from './DeleteManager';

interface CommandTest {
  foo: any;
}

describe(DeleteManager.name, () => {
  let deleteAdapterMock: Mocked<DeleteAdapter<CommandTest>>;
  let deleteManager: DeleteManager<CommandTest>;

  beforeEach(() => {
    deleteAdapterMock = {
      delete: vi.fn(),
    };

    deleteManager = new DeleteManager(deleteAdapterMock);
  });

  describe('.manage()', () => {
    describe('when called', () => {
      let commandTestFixture: CommandTest;

      beforeEach(async () => {
        commandTestFixture = { foo: 'foo' };

        await deleteManager.manage(commandTestFixture);
      });

      afterEach(() => {
        vi.clearAllMocks();
      });

      it('should call deleteAdapter.delete()', () => {
        expect(deleteAdapterMock.delete).toHaveBeenCalledOnce();
        expect(deleteAdapterMock.delete).toHaveBeenCalledWith(commandTestFixture);
      });
    });
  });
});
