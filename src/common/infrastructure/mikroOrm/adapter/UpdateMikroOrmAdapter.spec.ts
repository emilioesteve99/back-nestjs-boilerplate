import { EntityData, EntityManager, EntityRepository, ObjectQuery } from '@mikro-orm/core';
import { Mock, Mocked } from 'vitest';

import { UpdateMikroOrmAdapter } from './UpdateMikroOrmAdapter';
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

describe(UpdateMikroOrmAdapter.name, () => {
  let entityManagerMock: Mocked<EntityManager>;
  let entityRepositoryMock: Mocked<EntityRepository<ModelTest>>;
  let updateOneCommandsTestToFindQueryMikroOrmConverterAsyncMock: Mocked<
    ConverterAsync<CommandTest, ObjectQuery<ModelTest>[]>
  >;
  let updateOneCommandsTestToSetQueryMikroOrmConverterAsyncMock: Mocked<
    ConverterAsync<CommandTest, EntityData<ModelTest>[]>
  >;
  let updateMikroOrmAdapter: UpdateMikroOrmAdapter<CommandTest, ModelTest>;

  beforeAll(() => {
    entityManagerMock = {
      persistAndFlush: vi.fn(),
    } as Partial<Mocked<EntityManager>> as Mocked<EntityManager>;
    entityRepositoryMock = {
      assign: vi.fn(),
      find: vi.fn(),
      getEntityManager: vi.fn(() => entityManagerMock),
    } as unknown as Mocked<EntityRepository<ModelTest>>;

    updateOneCommandsTestToFindQueryMikroOrmConverterAsyncMock = {
      convert: vi.fn(),
    };

    updateOneCommandsTestToSetQueryMikroOrmConverterAsyncMock = {
      convert: vi.fn(),
    };

    updateMikroOrmAdapter = new UpdateMikroOrmAdapter<CommandTest, ModelTest>(
      entityRepositoryMock,
      updateOneCommandsTestToFindQueryMikroOrmConverterAsyncMock,
      updateOneCommandsTestToSetQueryMikroOrmConverterAsyncMock,
    );
  });

  describe('.update()', () => {
    describe('when called', () => {
      let commandTestFixture: CommandTest;
      let findQueryMikroOrmTestFixture: ObjectQuery<ModelTest>;
      let modelTestFixture: ModelTest;
      let modelTestFixtures: ModelTest[];
      let setQueryMikroOrmTestFixture: EntityData<ModelTest>;

      beforeAll(async () => {
        commandTestFixture = {
          foo: 'foo',
        };
        findQueryMikroOrmTestFixture = {
          foo: 'foo',
        };
        modelTestFixture = {
          foo: 'foo',
        };
        modelTestFixtures = [modelTestFixture];
        setQueryMikroOrmTestFixture = {
          foo: 'foo',
        };

        updateOneCommandsTestToFindQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce([
          findQueryMikroOrmTestFixture,
        ]);
        entityRepositoryMock.find.mockResolvedValueOnce(modelTestFixtures);
        updateOneCommandsTestToSetQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce([
          setQueryMikroOrmTestFixture,
        ]);
        entityRepositoryMock.assign.mockReturnValueOnce(modelTestFixture);

        await updateMikroOrmAdapter.update(commandTestFixture);
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call updateOneCommandsTestToFindQueryMikroOrmConverterAsync.convert()', () => {
        expect(updateOneCommandsTestToFindQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledOnce();
        expect(updateOneCommandsTestToFindQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(
          commandTestFixture,
        );
      });

      it('should call updateOneCommandsTestToSetQueryMikroOrmConverterAsync.convert()', () => {
        expect(updateOneCommandsTestToSetQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledOnce();
        expect(updateOneCommandsTestToSetQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(
          commandTestFixture,
        );
      });

      it('should call entityRepository.assign()', () => {
        expect(entityRepositoryMock.assign).toHaveBeenCalledTimes(modelTestFixtures.length);

        for (let nthCall: number = 1; nthCall <= modelTestFixtures.length; nthCall++) {
          expect(entityRepositoryMock.assign).toHaveBeenNthCalledWith(
            nthCall,
            modelTestFixtures[nthCall - 1],
            setQueryMikroOrmTestFixture,
            { mergeObjects: false },
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
    });

    describe('when called and entityRepository.flush throws an Error matching PostgreSqlErrorType.FOREIGN_KEY_VIOLATION', () => {
      let commandTestFixture: CommandTest;
      let findQueryMikroOrmTestFixture: ObjectQuery<ModelTest>;
      let modelTestFixture: ModelTest;
      let modelTestFixtures: ModelTest[];
      let setQueryMikroOrmTestFixture: EntityData<ModelTest>;
      let errorFixture: PostgreSqlError;
      let result: unknown;

      beforeAll(async () => {
        commandTestFixture = {
          foo: 'foo',
        };
        findQueryMikroOrmTestFixture = {
          foo: 'foo',
        };
        modelTestFixture = {
          foo: 'foo',
        };
        modelTestFixtures = [modelTestFixture];
        setQueryMikroOrmTestFixture = {
          foo: 'foo',
        };
        errorFixture = PostgreSqlErrorFixtures.withCodeForeignKeyViolation;

        updateOneCommandsTestToFindQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce([
          findQueryMikroOrmTestFixture,
        ]);
        updateOneCommandsTestToSetQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce([
          setQueryMikroOrmTestFixture,
        ]);
        entityRepositoryMock.find.mockResolvedValueOnce(modelTestFixtures);
        entityManagerMock.persistAndFlush.mockRejectedValueOnce(errorFixture);
        (isPostgreSqlErrorWithErrorType as unknown as Mock).mockReturnValueOnce(true);

        try {
          await updateMikroOrmAdapter.update(commandTestFixture);
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
      let findQueryMikroOrmTestFixture: ObjectQuery<ModelTest>;
      let modelTestFixture: ModelTest;
      let modelTestFixtures: ModelTest[];
      let setQueryMikroOrmTestFixture: EntityData<ModelTest>;
      let errorFixture: PostgreSqlError;
      let result: unknown;

      beforeAll(async () => {
        commandTestFixture = {
          foo: 'foo',
        };
        findQueryMikroOrmTestFixture = {
          foo: 'foo',
        };
        modelTestFixture = {
          foo: 'foo',
        };
        modelTestFixtures = [modelTestFixture];
        setQueryMikroOrmTestFixture = {
          foo: 'foo',
        };
        errorFixture = PostgreSqlErrorFixtures.withCodeUniqueViolation;

        updateOneCommandsTestToFindQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce([
          findQueryMikroOrmTestFixture,
        ]);
        updateOneCommandsTestToSetQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce([
          setQueryMikroOrmTestFixture,
        ]);
        entityRepositoryMock.find.mockResolvedValueOnce(modelTestFixtures);
        entityManagerMock.persistAndFlush.mockRejectedValueOnce(errorFixture);
        (isPostgreSqlErrorWithErrorType as unknown as Mock).mockReturnValueOnce(false).mockReturnValueOnce(true);

        try {
          await updateMikroOrmAdapter.update(commandTestFixture);
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

    describe('when called and entityRepository.flush throws an Error and isPostgreSqlErrorWithErrorType returns false', () => {
      let commandTestFixture: CommandTest;
      let findQueryMikroOrmTestFixture: ObjectQuery<ModelTest>;
      let modelTestFixture: ModelTest;
      let modelTestFixtures: ModelTest[];
      let setQueryMikroOrmTestFixture: EntityData<ModelTest>;
      let errorFixture: unknown;
      let result: unknown;

      beforeAll(async () => {
        commandTestFixture = {
          foo: 'foo',
        };
        findQueryMikroOrmTestFixture = {
          foo: 'foo',
        };
        modelTestFixture = {
          foo: 'foo',
        };
        modelTestFixtures = [modelTestFixture];
        setQueryMikroOrmTestFixture = {
          foo: 'foo',
        };
        errorFixture = new Error('Error when entityRepository.flush is called');

        updateOneCommandsTestToFindQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce([
          findQueryMikroOrmTestFixture,
        ]);
        updateOneCommandsTestToSetQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce([
          setQueryMikroOrmTestFixture,
        ]);
        entityRepositoryMock.find.mockResolvedValueOnce(modelTestFixtures);
        entityManagerMock.persistAndFlush.mockRejectedValueOnce(errorFixture);
        (isPostgreSqlErrorWithErrorType as unknown as Mock).mockReturnValueOnce(false);

        try {
          await updateMikroOrmAdapter.update(commandTestFixture);
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
