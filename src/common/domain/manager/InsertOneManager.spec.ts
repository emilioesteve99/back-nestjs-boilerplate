import { Mocked } from 'vitest';
import { InsertOneAdapter } from '../adapter/InsertOneAdapter';
import { InsertOneManager } from './InsertOneManager';

interface CommandTest {
  foo: any;
}

interface ModelTest {
  foo: any;
}

describe(InsertOneManager.name, () => {
  let insertOneAdapterMock: Mocked<InsertOneAdapter<CommandTest, ModelTest>>;
  let insertOneManager: InsertOneManager<CommandTest, ModelTest>;

  beforeEach(() => {
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

      beforeEach(async () => {
        commandTestFixture = {
          foo: 'foo',
        };
        modelTestFixture = {
          foo: 'foo',
        };

        insertOneAdapterMock.insertOne.mockResolvedValueOnce(modelTestFixture);

        result = await insertOneManager.manage(commandTestFixture);
      });

      afterEach(() => {
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
