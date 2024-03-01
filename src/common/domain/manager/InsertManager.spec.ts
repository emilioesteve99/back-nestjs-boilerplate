import { Mocked } from 'vitest';

import { InsertManager } from './InsertManager';
import { InsertAdapter } from '../adapter/InsertAdapter';

interface CommandTest {
  foo: any;
}

interface ModelTest {
  foo: any;
}

describe(InsertManager.name, () => {
  let insertAdapterMock: Mocked<InsertAdapter<CommandTest, ModelTest>>;
  let insertManager: InsertManager<CommandTest, ModelTest>;

  beforeAll(() => {
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

      beforeAll(async () => {
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

      afterAll(() => {
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
