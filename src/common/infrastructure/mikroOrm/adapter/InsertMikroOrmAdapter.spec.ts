import { EntityManager, EntityRepository, RequiredEntityData } from '@mikro-orm/core';
import { Mock, Mocked } from 'vitest';

import { InsertMikroOrmAdapter } from './InsertMikroOrmAdapter';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { InvalidArgumentException } from '../../../domain/exception/InvalidArgumentException';
import { PostgreSqlErrorFixtures } from '../../../fixtures/infrastructure/postgresql/model/PostgreSqlErrorFixtures';
import { PostgreSqlError } from '../../postgresql/model/PostgreSqlError';
import { PostgreSqlErrorType } from '../../postgresql/model/PostgreSqlErrorType';
import { isPostgreSqlErrorWithErrorType } from '../../postgresql/typeguard/isPostgreSqlErrorWithErrorType';

vi.mock('../../postgresql/typeguard/isPostgreSqlErrorWithErrorType');

interface InsertOneCommandTest {
  foo: any;
}

interface InsertCommandTest {
  commands: InsertOneCommandTest[];
}

interface ModelTest {
  foo: any;
}

describe(InsertMikroOrmAdapter.name, () => {
  let entityManagerMock: Mocked<EntityManager>;
  let entityRepositoryMock: Mocked<EntityRepository<ModelTest>>;
  let insertCommandTestToInsertQueryMikroOrmConverterAsyncMock: Mocked<
    ConverterAsync<InsertCommandTest, RequiredEntityData<ModelTest>[]>
  >;
  let modelDbToModelConverterAsyncMock: Mocked<ConverterAsync<ModelTest, ModelTest>>;
  let insertMikroOrmAdapter: InsertMikroOrmAdapter<InsertCommandTest, ModelTest, ModelTest>;

  beforeAll(() => {
    entityManagerMock = {
      persistAndFlush: vi.fn(),
    } as Mocked<Partial<EntityManager>> as Mocked<EntityManager>;
    entityRepositoryMock = {
      create: vi.fn(),
      getEntityManager: vi.fn(() => entityManagerMock),
    } as Mocked<Partial<EntityRepository<ModelTest>>> as Mocked<EntityRepository<ModelTest>>;

    insertCommandTestToInsertQueryMikroOrmConverterAsyncMock = {
      convert: vi.fn(),
    };

    modelDbToModelConverterAsyncMock = {
      convert: vi.fn(),
    };

    insertMikroOrmAdapter = new InsertMikroOrmAdapter<InsertCommandTest, ModelTest, ModelTest>(
      entityRepositoryMock,
      insertCommandTestToInsertQueryMikroOrmConverterAsyncMock,
      modelDbToModelConverterAsyncMock,
    );
  });

  describe('.insert()', () => {
    describe('when called', () => {
      let insertOneCommandTestFixture: InsertOneCommandTest;
      let insertCommandTestFixture: InsertCommandTest;
      let insertOneQueryMikroOrmTestFixture: RequiredEntityData<ModelTest>;
      let insertQueryMikroOrmTestFixture: RequiredEntityData<ModelTest>[];
      let modelTestFixture: ModelTest;
      let modelTestFixtures: ModelTest[];
      let result: unknown;

      beforeAll(async () => {
        insertOneCommandTestFixture = {
          foo: 'foo',
        };
        insertCommandTestFixture = {
          commands: [insertOneCommandTestFixture],
        };
        insertOneQueryMikroOrmTestFixture = {};
        insertQueryMikroOrmTestFixture = [insertOneQueryMikroOrmTestFixture];
        modelTestFixture = {
          foo: 'foo',
        };
        modelTestFixtures = [modelTestFixture];

        insertCommandTestToInsertQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          insertQueryMikroOrmTestFixture,
        );

        for (let nthCall: number = 1; nthCall <= insertCommandTestFixture.commands.length; nthCall++) {
          entityRepositoryMock.create.mockReturnValueOnce(insertCommandTestFixture.commands[nthCall - 1] as ModelTest);
        }

        for (let nthCall: number = 1; nthCall <= insertCommandTestFixture.commands.length; nthCall++) {
          modelDbToModelConverterAsyncMock.convert.mockResolvedValueOnce(modelTestFixtures[nthCall - 1] as ModelTest);
        }

        result = await insertMikroOrmAdapter.insert(insertCommandTestFixture);
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call commandTestToInsertOneQueryMikroOrmConverterAsync.convert()', () => {
        expect(insertCommandTestToInsertQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledOnce();
        expect(insertCommandTestToInsertQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(
          insertCommandTestFixture,
        );
      });

      it('should call entityRepository.create()', () => {
        expect(entityRepositoryMock.create).toHaveBeenCalledTimes(insertQueryMikroOrmTestFixture.length);

        for (let nthCall: number = 1; nthCall <= insertQueryMikroOrmTestFixture.length; nthCall++) {
          expect(entityRepositoryMock.create).toHaveBeenNthCalledWith(
            nthCall,
            insertQueryMikroOrmTestFixture[nthCall - 1],
          );
        }
      });

      it('should call entityRepository.getEntityManager()', () => {
        expect(entityRepositoryMock.getEntityManager).toHaveBeenCalledOnce();
      });

      it('should call entityRepository.getEntityManager().persistAndFlush()', () => {
        expect(entityManagerMock.persistAndFlush).toHaveBeenCalledOnce();
        expect(entityManagerMock.persistAndFlush).toHaveBeenCalledWith(modelTestFixtures);
      });

      it('should call modelDbToModelConverterAsync.convert()', () => {
        expect(modelDbToModelConverterAsyncMock.convert).toHaveBeenCalledTimes(modelTestFixtures.length);

        for (let nthCall: number = 1; nthCall <= modelTestFixtures.length; nthCall++) {
          expect(modelDbToModelConverterAsyncMock.convert).toHaveBeenNthCalledWith(
            nthCall,
            modelTestFixtures[nthCall - 1],
          );
        }
      });

      it('should return an ModelTest[]', () => {
        expect(result).toStrictEqual(modelTestFixtures);
      });
    });

    describe('when called and entityRepository.persistAndFlush throws an Error matching PostgreSqlErrorType.FOREIGN_KEY_VIOLATION', () => {
      let insertOneCommandTestFixture: InsertOneCommandTest;
      let insertCommandTestFixture: InsertCommandTest;
      let insertOneQueryMikroOrmTestFixture: RequiredEntityData<ModelTest>;
      let insertQueryMikroOrmTestFixture: RequiredEntityData<ModelTest>[];
      let errorFixture: PostgreSqlError;
      let result: unknown;

      beforeAll(async () => {
        insertOneCommandTestFixture = {
          foo: 'foo',
        };
        insertCommandTestFixture = {
          commands: [insertOneCommandTestFixture],
        };
        insertOneQueryMikroOrmTestFixture = {};
        insertQueryMikroOrmTestFixture = [insertOneQueryMikroOrmTestFixture];
        errorFixture = PostgreSqlErrorFixtures.withCodeForeignKeyViolation;

        insertCommandTestToInsertQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          insertQueryMikroOrmTestFixture,
        );

        for (let nthCall: number = 1; nthCall <= insertCommandTestFixture.commands.length; nthCall++) {
          entityRepositoryMock.create.mockReturnValueOnce(insertCommandTestFixture.commands[nthCall - 1] as ModelTest);
        }

        entityManagerMock.persistAndFlush.mockRejectedValueOnce(errorFixture);
        (isPostgreSqlErrorWithErrorType as unknown as Mock).mockReturnValueOnce(true);

        try {
          await insertMikroOrmAdapter.insert(insertCommandTestFixture);
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

    describe('when called and entityRepository.persistAndFlush throws an Error matching PostgreSqlErrorType.UNIQUE_KEY_VIOLATION', () => {
      let insertOneCommandTestFixture: InsertOneCommandTest;
      let insertCommandTestFixture: InsertCommandTest;
      let insertOneQueryMikroOrmTestFixture: RequiredEntityData<ModelTest>;
      let insertQueryMikroOrmTestFixture: RequiredEntityData<ModelTest>[];
      let errorFixture: PostgreSqlError;
      let result: unknown;

      beforeAll(async () => {
        insertOneCommandTestFixture = {
          foo: 'foo',
        };
        insertCommandTestFixture = {
          commands: [insertOneCommandTestFixture],
        };
        insertOneQueryMikroOrmTestFixture = {};
        insertQueryMikroOrmTestFixture = [insertOneQueryMikroOrmTestFixture];
        errorFixture = PostgreSqlErrorFixtures.withCodeUniqueViolation;

        insertCommandTestToInsertQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          insertQueryMikroOrmTestFixture,
        );

        for (let nthCall: number = 1; nthCall <= insertCommandTestFixture.commands.length; nthCall++) {
          entityRepositoryMock.create.mockReturnValueOnce(insertCommandTestFixture.commands[nthCall - 1] as ModelTest);
        }

        entityManagerMock.persistAndFlush.mockRejectedValueOnce(errorFixture);
        (isPostgreSqlErrorWithErrorType as unknown as Mock).mockReturnValueOnce(false).mockReturnValueOnce(true);

        try {
          await insertMikroOrmAdapter.insert(insertCommandTestFixture);
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
      let insertOneCommandTestFixture: InsertOneCommandTest;
      let insertCommandTestFixture: InsertCommandTest;
      let insertOneQueryMikroOrmTestFixture: RequiredEntityData<ModelTest>;
      let insertQueryMikroOrmTestFixture: RequiredEntityData<ModelTest>[];
      let errorFixture: unknown;
      let result: unknown;

      beforeAll(async () => {
        insertOneCommandTestFixture = {
          foo: 'foo',
        };
        insertCommandTestFixture = {
          commands: [insertOneCommandTestFixture],
        };
        insertOneQueryMikroOrmTestFixture = {};
        insertQueryMikroOrmTestFixture = [insertOneQueryMikroOrmTestFixture];
        errorFixture = new Error('Error when entityRepository.persistAndFlush is called');

        insertCommandTestToInsertQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          insertQueryMikroOrmTestFixture,
        );

        for (let nthCall: number = 1; nthCall <= insertCommandTestFixture.commands.length; nthCall++) {
          entityRepositoryMock.create.mockReturnValueOnce(insertCommandTestFixture.commands[nthCall - 1] as ModelTest);
        }

        entityManagerMock.persistAndFlush.mockRejectedValueOnce(errorFixture);
        (isPostgreSqlErrorWithErrorType as unknown as Mock).mockReturnValueOnce(false);

        try {
          await insertMikroOrmAdapter.insert(insertCommandTestFixture);
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
