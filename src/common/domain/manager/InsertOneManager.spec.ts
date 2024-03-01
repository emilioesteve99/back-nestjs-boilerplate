import { Mocked } from 'vitest';

import { InsertOneManager } from './InsertOneManager';
import { InsertOneAdapter } from '../adapter/InsertOneAdapter';

interface CommandTest {
  foo: any;
}

interface ModelTest {
  foo: any;
}

describe(InsertOneManager.name, () => {
  let insertOneAdapterMock: Mocked<InsertOneAdapter<CommandTest, ModelTest>>;
  let insertOneManager: InsertOneManager<CommandTest, ModelTest>;

  beforeAll(() => {
    insertOneAdapterMock = {
      insertOne: vi.fn(),
    };

    insertOneManager = new InsertOneManager(insertOneAdapterMock);
  });

  describe('.manage()', () => {
    describe('when called', () => {
      let commandTestFixture: CommandTest;
      let modelTestFixture: ModelTest;
      let result: unknown;

      beforeAll(async () => {
        commandTestFixture = {
          foo: 'foo',
        };
        modelTestFixture = {
          foo: 'foo',
        };

        insertOneAdapterMock.insertOne.mockResolvedValueOnce(modelTestFixture);

        result = await insertOneManager.manage(commandTestFixture);
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call insertOneAdapter.insertOne()', () => {
        expect(insertOneAdapterMock.insertOne).toHaveBeenCalledOnce();
        expect(insertOneAdapterMock.insertOne).toHaveBeenCalledWith(commandTestFixture);
      });

      it('should return a ModelTest', () => {
        expect(result).toBe(modelTestFixture);
      });
    });
  });
});
