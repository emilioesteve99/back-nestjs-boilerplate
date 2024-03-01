import { EntityManager, EntityRepository, RequiredEntityData } from '@mikro-orm/core';
import { Mock, Mocked } from 'vitest';

import { InsertOneMikroOrmAdapter } from './InsertOneMikroOrmAdapter';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { InvalidArgumentException } from '../../../domain/exception/InvalidArgumentException';
import { PostgreSqlErrorFixtures } from '../../../fixtures/infrastructure/postgresql/model/PostgreSqlErrorFixtures';
import { PostgreSqlError } from '../../postgresql/model/PostgreSqlError';
import { PostgreSqlErrorType } from '../../postgresql/model/PostgreSqlErrorType';
import { isPostgreSqlErrorWithErrorType } from '../../postgresql/typeguard/isPostgreSqlErrorWithErrorType';

vi.mock('../../postgresql/typeguard/isPostgreSqlErrorWithErrorType');

interface CommandTest {
  foo: any;
}

interface ModelTest {
  foo: any;
}

describe(InsertOneMikroOrmAdapter.name, () => {
  let entityManagerMock: Mocked<EntityManager>;
  let entityRepositoryMock: Mocked<EntityRepository<ModelTest>>;
  let commandTestToInsertOneQueryMikroOrmConverterAsyncMock: Mocked<
    ConverterAsync<CommandTest, RequiredEntityData<ModelTest>>
  >;
  let modelDbToModelConverterAsyncMock: Mocked<ConverterAsync<ModelTest, ModelTest>>;
  let insertOneMikroOrmAdapter: InsertOneMikroOrmAdapter<CommandTest, ModelTest, ModelTest>;

  beforeAll(() => {
    entityManagerMock = {
      persistAndFlush: vi.fn(),
    } as Mocked<Partial<EntityManager>> as Mocked<EntityManager>;
    entityRepositoryMock = {
      create: vi.fn(),
      getEntityManager: vi.fn(() => entityManagerMock),
    } as Mocked<Partial<EntityRepository<ModelTest>>> as Mocked<EntityRepository<ModelTest>>;

    commandTestToInsertOneQueryMikroOrmConverterAsyncMock = {
      convert: vi.fn(),
    };

    modelDbToModelConverterAsyncMock = {
      convert: vi.fn(),
    };

    insertOneMikroOrmAdapter = new InsertOneMikroOrmAdapter<CommandTest, ModelTest, ModelTest>(
      entityRepositoryMock,
      commandTestToInsertOneQueryMikroOrmConverterAsyncMock,
      modelDbToModelConverterAsyncMock,
    );
  });

  describe('.insertOne()', () => {
    describe('when called', () => {
      let commandTestFixture: CommandTest;
      let insertOneQueryMikroOrmTestFixture: RequiredEntityData<ModelTest>;
      let modelTestFixture: ModelTest;
      let result: unknown;

      beforeAll(async () => {
        commandTestFixture = {
          foo: 'foo',
        };
        insertOneQueryMikroOrmTestFixture = {};
        modelTestFixture = {
          foo: 'foo',
        };

        commandTestToInsertOneQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          insertOneQueryMikroOrmTestFixture,
        );
        entityRepositoryMock.create.mockReturnValueOnce(modelTestFixture);
        modelDbToModelConverterAsyncMock.convert.mockResolvedValueOnce(modelTestFixture);

        result = await insertOneMikroOrmAdapter.insertOne(commandTestFixture);
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call commandTestToInsertOneQueryMikroOrmConverterAsync.convert()', () => {
        expect(commandTestToInsertOneQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledOnce();
        expect(commandTestToInsertOneQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(commandTestFixture);
      });

      it('should call entityRepository.create()', () => {
        expect(entityRepositoryMock.create).toHaveBeenCalledOnce();
        expect(entityRepositoryMock.create).toHaveBeenCalledWith(insertOneQueryMikroOrmTestFixture);
      });

      it('should call entityRepository.getEntityManager()', () => {
        expect(entityRepositoryMock.getEntityManager).toHaveBeenCalledOnce();
      });

      it('should call entityRepository.getEntityManager().persistAndFlush()', () => {
        expect(entityManagerMock.persistAndFlush).toHaveBeenCalledOnce();
        expect(entityManagerMock.persistAndFlush).toHaveBeenCalledWith(modelTestFixture);
      });

      it('should return an ModelTest', () => {
        expect(result).toBe(modelTestFixture);
      });
    });

    describe('when called and entityRepository.persistAndFlush throws an Error matching PostgreSqlErrorType.FOREIGN_KEY_VIOLATION', () => {
      let commandTestFixture: CommandTest;
      let insertOneQueryMikroOrmTestFixture: RequiredEntityData<ModelTest>;
      let modelTestFixture: ModelTest;
      let errorFixture: PostgreSqlError;
      let result: unknown;

      beforeAll(async () => {
        commandTestFixture = {
          foo: 'foo',
        };
        insertOneQueryMikroOrmTestFixture = {};
        modelTestFixture = {
          foo: 'foo',
        };
        errorFixture = PostgreSqlErrorFixtures.withCodeForeignKeyViolation;

        commandTestToInsertOneQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          insertOneQueryMikroOrmTestFixture,
        );
        entityRepositoryMock.create.mockReturnValueOnce(modelTestFixture);
        entityManagerMock.persistAndFlush.mockRejectedValueOnce(errorFixture);
        (isPostgreSqlErrorWithErrorType as unknown as Mock).mockReturnValueOnce(true);

        try {
          await insertOneMikroOrmAdapter.insertOne(commandTestFixture);
        } catch (error: unknown) {
          result = error;
        }
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call isPostgreSqlErrorWithErrorType()', () => {
        expect(isPostgreSqlErrorWithErrorType).toHaveBeenCalledOnce();
        expect(isPostgreSqlErrorWithErrorType).toHaveBeenCalledWith(errorFixture, [
          PostgreSqlErrorType.FOREIGN_KEY_VIOLATION,
        ]);
      });

      it('should throw an InvalidArgumentException', () => {
        expect(result).toBeInstanceOf(InvalidArgumentException);
        expect((result as InvalidArgumentException).message).toBe('Foreign key violation');
      });
    });

    describe('when called and entityRepository.persistAndFlush throws an Error matching PostgreSqlErrorType.UNIQUE_VIOLATION', () => {
      let commandTestFixture: CommandTest;
      let insertOneQueryMikroOrmTestFixture: RequiredEntityData<ModelTest>;
      let modelTestFixture: ModelTest;
      let errorFixture: PostgreSqlError;
      let result: unknown;

      beforeAll(async () => {
        commandTestFixture = {
          foo: 'foo',
        };
        insertOneQueryMikroOrmTestFixture = {};
        modelTestFixture = {
          foo: 'foo',
        };
        errorFixture = PostgreSqlErrorFixtures.withCodeUniqueViolation;

        commandTestToInsertOneQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          insertOneQueryMikroOrmTestFixture,
        );
        entityRepositoryMock.create.mockReturnValueOnce(modelTestFixture);
        entityManagerMock.persistAndFlush.mockRejectedValueOnce(errorFixture);
        (isPostgreSqlErrorWithErrorType as unknown as Mock).mockReturnValueOnce(false).mockReturnValueOnce(true);

        try {
          await insertOneMikroOrmAdapter.insertOne(commandTestFixture);
        } catch (error: unknown) {
          result = error;
        }
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call isPostgreSqlErrorWithErrorType()', () => {
        expect(isPostgreSqlErrorWithErrorType).toHaveBeenCalledTimes(2);
        expect(isPostgreSqlErrorWithErrorType).toHaveBeenNthCalledWith(1, errorFixture, [
          PostgreSqlErrorType.FOREIGN_KEY_VIOLATION,
        ]);
        expect(isPostgreSqlErrorWithErrorType).toHaveBeenNthCalledWith(2, errorFixture, [
          PostgreSqlErrorType.UNIQUE_VIOLATION,
        ]);
      });

      it('should throw an InvalidArgumentException', () => {
        expect(result).toBeInstanceOf(InvalidArgumentException);
        expect((result as InvalidArgumentException).message).toBe('Duplicated entity');
      });
    });

    describe('when called and entityRepository.persistAndFlush throws an Error and isPostgreSqlErrorWithErrorType returns false', () => {
      let commandTestFixture: CommandTest;
      let insertOneQueryMikroOrmTestFixture: RequiredEntityData<ModelTest>;
      let modelTestFixture: ModelTest;
      let errorFixture: unknown;
      let result: unknown;

      beforeAll(async () => {
        commandTestFixture = {
          foo: 'foo',
        };
        insertOneQueryMikroOrmTestFixture = {};
        modelTestFixture = {
          foo: 'foo',
        };
        errorFixture = new Error('Error when entityRepository.persistAndFlush is called');

        commandTestToInsertOneQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          insertOneQueryMikroOrmTestFixture,
        );
        entityRepositoryMock.create.mockReturnValueOnce(modelTestFixture);
        entityManagerMock.persistAndFlush.mockRejectedValueOnce(errorFixture);
        (isPostgreSqlErrorWithErrorType as unknown as Mock).mockReturnValueOnce(false);

        try {
          await insertOneMikroOrmAdapter.insertOne(commandTestFixture);
        } catch (error: unknown) {
          result = error;
        }
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should throw an Error', () => {
        expect(result).toBe(errorFixture);
      });
    });
  });
});
