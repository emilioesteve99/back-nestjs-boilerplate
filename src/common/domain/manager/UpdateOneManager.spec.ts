import { Mocked } from 'vitest';

import { UpdateOneManager } from './UpdateOneManager';
import { UpdateOneAdapter } from '../adapter/UpdateOneAdapter';

interface CommandTest {
  foo: any;
}

describe(UpdateOneManager.name, () => {
  let updateOneAdapterMock: Mocked<UpdateOneAdapter<CommandTest>>;
  let updateOneManager: UpdateOneManager<CommandTest>;

  beforeAll(() => {
    updateOneAdapterMock = {
      updateOne: vi.fn(),
    };

    updateOneManager = new UpdateOneManager(updateOneAdapterMock);
  });

  describe('.manage()', () => {
    describe('when called', () => {
      let commandTestFixture: CommandTest;

      beforeAll(async () => {
        commandTestFixture = { foo: 'foo' };

        await updateOneManager.manage(commandTestFixture);
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call updateAdapter.updateOne()', () => {
        expect(updateOneAdapterMock.updateOne).toHaveBeenCalledOnce();
        expect(updateOneAdapterMock.updateOne).toHaveBeenCalledWith(commandTestFixture);
      });
    });
  });
});
