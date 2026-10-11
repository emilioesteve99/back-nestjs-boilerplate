import { Mocked } from 'vitest';
import { InsertAdapter } from '../adapter/InsertAdapter';
import { InsertManager } from './InsertManager';

interface CommandTest {
  foo: any;
}

interface ModelTest {
  foo: any;
}

describe(InsertManager.name, () => {
  let insertAdapterMock: Mocked<InsertAdapter<CommandTest, ModelTest>>;
  let insertManager: InsertManager<CommandTest, ModelTest>;

  beforeEach(() => {
    insertAdapterMock = {
      insert: vi.fn(),
    };

    insertManager = new InsertManager(insertAdapterMock);
  });

  describe('.manage()', () => {
    describe('when called', () => {
      let commandTestFixture: CommandTest;
      let modelTestFixtures: ModelTest[];
      let result: unknown;

      beforeEach(async () => {
        commandTestFixture = {
          foo: 'foo',
        };
        modelTestFixtures = [
          {
            foo: 'foo',
          },
        ];

        insertAdapterMock.insert.mockResolvedValueOnce(modelTestFixtures);

        result = await insertManager.manage(commandTestFixture);
      });

      afterEach(() => {
        vi.clearAllMocks();
      });

      it('should call insertAdapter.insertOne()', () => {
        expect(insertAdapterMock.insert).toHaveBeenCalledOnce();
        expect(insertAdapterMock.insert).toHaveBeenCalledWith(commandTestFixture);
      });

      it('should return a ModelTest', () => {
        expect(result).toBe(modelTestFixtures);
      });
    });
  });
});
