import { Mocked } from 'vitest';
import { UpdateOneAdapter } from '../adapter/UpdateOneAdapter';
import { UpdateOneManager } from './UpdateOneManager';

interface CommandTest {
  foo: any;
}

describe(UpdateOneManager.name, () => {
  let updateOneAdapterMock: Mocked<UpdateOneAdapter<CommandTest>>;
  let updateOneManager: UpdateOneManager<CommandTest>;

  beforeEach(() => {
    updateOneAdapterMock = {
      updateOne: vi.fn(),
    };

    updateOneManager = new UpdateOneManager(updateOneAdapterMock);
  });

  describe('.manage()', () => {
    describe('when called', () => {
      let commandTestFixture: CommandTest;

      beforeEach(async () => {
        commandTestFixture = { foo: 'foo' };

        await updateOneManager.manage(commandTestFixture);
      });

      afterEach(() => {
        vi.clearAllMocks();
      });

      it('should call updateAdapter.updateOne()', () => {
        expect(updateOneAdapterMock.updateOne).toHaveBeenCalledOnce();
        expect(updateOneAdapterMock.updateOne).toHaveBeenCalledWith(commandTestFixture);
      });
    });
  });
});
