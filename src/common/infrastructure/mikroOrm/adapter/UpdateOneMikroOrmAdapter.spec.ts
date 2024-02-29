import { EntityData, EntityManager, EntityRepository, ObjectQuery } from '@mikro-orm/core';
import { Mock, Mocked } from 'vitest';

import { UpdateOneMikroOrmAdapter } from './UpdateOneMikroOrmAdapter';
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

describe(UpdateOneMikroOrmAdapter.name, () => {
  let entityManagerMock: Mocked<EntityManager>;
  let entityRepositoryMock: Mocked<EntityRepository<ModelTest>>;
  let commandTestToFindQueryMikroOrmConverterAsyncMock: Mocked<ConverterAsync<CommandTest, ObjectQuery<ModelTest>>>;
  let commandTestToSetQueryMikroOrmConverterAsyncMock: Mocked<ConverterAsync<CommandTest, EntityData<ModelTest>>>;
  let updateOneMikroOrmAdapter: UpdateOneMikroOrmAdapter<CommandTest, ModelTest>;

  beforeAll(() => {
    entityManagerMock = {
      persistAndFlush: vi.fn(),
    } as Partial<Mocked<EntityManager>> as Mocked<EntityManager>;
    entityRepositoryMock = {
      assign: vi.fn(),
      find: vi.fn(),
      getEntityManager: vi.fn(() => entityManagerMock),
    } as unknown as Mocked<EntityRepository<ModelTest>>;

    commandTestToFindQueryMikroOrmConverterAsyncMock = {
      convert: vi.fn(),
    };

    commandTestToSetQueryMikroOrmConverterAsyncMock = {
      convert: vi.fn(),
    };

    updateOneMikroOrmAdapter = new UpdateOneMikroOrmAdapter<CommandTest, ModelTest>(
      entityRepositoryMock,
      commandTestToFindQueryMikroOrmConverterAsyncMock,
      commandTestToSetQueryMikroOrmConverterAsyncMock,
    );
  });

  describe('.updateOne()', () => {
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

        commandTestToFindQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(findQueryMikroOrmTestFixture);
        entityRepositoryMock.find.mockResolvedValueOnce(modelTestFixtures);
        commandTestToSetQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(setQueryMikroOrmTestFixture);
        entityRepositoryMock.assign.mockReturnValueOnce(modelTestFixture);

        await updateOneMikroOrmAdapter.updateOne(commandTestFixture);
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call commandTestToFindQueryMikroOrmConverterAsync.convert()', () => {
        expect(commandTestToFindQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledOnce();
        expect(commandTestToFindQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(commandTestFixture);
      });

      it('should call commandTestToSetQueryMikroOrmConverterAsync.convert()', () => {
        expect(commandTestToSetQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledOnce();
        expect(commandTestToSetQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(commandTestFixture);
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

        commandTestToFindQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(findQueryMikroOrmTestFixture);
        commandTestToSetQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(setQueryMikroOrmTestFixture);
        entityRepositoryMock.find.mockResolvedValueOnce(modelTestFixtures);
        entityManagerMock.persistAndFlush.mockRejectedValueOnce(errorFixture);
        (isPostgreSqlErrorWithErrorType as unknown as Mock).mockReturnValueOnce(true);

        try {
          await updateOneMikroOrmAdapter.updateOne(commandTestFixture);
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

        commandTestToFindQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(findQueryMikroOrmTestFixture);
        commandTestToSetQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(setQueryMikroOrmTestFixture);
        entityRepositoryMock.find.mockResolvedValueOnce(modelTestFixtures);
        entityManagerMock.persistAndFlush.mockRejectedValueOnce(errorFixture);
        (isPostgreSqlErrorWithErrorType as unknown as Mock).mockReturnValueOnce(false).mockReturnValueOnce(true);

        try {
          await updateOneMikroOrmAdapter.updateOne(commandTestFixture);
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

        commandTestToFindQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(findQueryMikroOrmTestFixture);
        commandTestToSetQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(setQueryMikroOrmTestFixture);
        entityRepositoryMock.find.mockResolvedValueOnce(modelTestFixtures);
        entityManagerMock.persistAndFlush.mockRejectedValueOnce(errorFixture);
        (isPostgreSqlErrorWithErrorType as unknown as Mock).mockReturnValueOnce(false);

        try {
          await updateOneMikroOrmAdapter.updateOne(commandTestFixture);
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
