import { EntityRepository, ObjectQuery } from '@mikro-orm/core';
import { Mock, Mocked } from 'vitest';

import { DeleteMikroOrmAdapter } from './DeleteMikroOrmAdapter';
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

describe(DeleteMikroOrmAdapter.name, () => {
  let entityRepositoryMock: Mocked<EntityRepository<ModelTest>>;
  let commandTestToDeleteQueryMikroOrmConverterAsyncMock: Mocked<ConverterAsync<CommandTest, ObjectQuery<ModelTest>>>;
  let deleteMikroOrmAdapter: DeleteMikroOrmAdapter<CommandTest, ModelTest>;

  beforeAll(() => {
    entityRepositoryMock = {
      nativeDelete: vi.fn(),
    } as Partial<Mocked<EntityRepository<ModelTest>>> as Mocked<EntityRepository<ModelTest>>;

    commandTestToDeleteQueryMikroOrmConverterAsyncMock = {
      convert: vi.fn(),
    };

    deleteMikroOrmAdapter = new DeleteMikroOrmAdapter<CommandTest, ModelTest>(
      entityRepositoryMock,
      commandTestToDeleteQueryMikroOrmConverterAsyncMock,
    );
  });

  describe('.delete', () => {
    describe('when called', () => {
      let commandTestFixture: CommandTest;
      let deleteQueryMikroOrmTestFixture: ObjectQuery<ModelTest>;

      beforeAll(async () => {
        commandTestFixture = {
          foo: 'foo',
        };
        deleteQueryMikroOrmTestFixture = {
          foo: 'foo',
        };

        commandTestToDeleteQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          deleteQueryMikroOrmTestFixture,
        );

        await deleteMikroOrmAdapter.delete(commandTestFixture);
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call commandTestToDeleteQueryMikroOrmConverterAsync.convert()', () => {
        expect(commandTestToDeleteQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledOnce();
        expect(commandTestToDeleteQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(commandTestFixture);
      });

      it('should call entityRepository.nativeDelete()', () => {
        expect(entityRepositoryMock.nativeDelete).toHaveBeenCalledOnce();
        expect(entityRepositoryMock.nativeDelete).toHaveBeenCalledWith(deleteQueryMikroOrmTestFixture);
      });
    });

    describe('when called and entityRepository.nativeDelete throws an Error matching PostgreSqlErrorType.FOREIGN_KEY_VIOLATION', () => {
      let commandTestFixture: CommandTest;
      let deleteQueryMikroOrmTestFixture: ObjectQuery<ModelTest>;
      let errorFixture: PostgreSqlError;
      let result: unknown;

      beforeAll(async () => {
        commandTestFixture = {
          foo: 'foo',
        };
        deleteQueryMikroOrmTestFixture = {
          foo: 'foo',
        };
        errorFixture = PostgreSqlErrorFixtures.withCodeForeignKeyViolation;

        commandTestToDeleteQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          deleteQueryMikroOrmTestFixture,
        );
        entityRepositoryMock.nativeDelete.mockRejectedValueOnce(errorFixture);
        (isPostgreSqlErrorWithErrorType as unknown as Mock).mockReturnValueOnce(true);

        try {
          await deleteMikroOrmAdapter.delete(commandTestFixture);
        } catch (error: unknown) {
          result = error;
        }
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call commandTestToDeleteQueryMikroOrmConverterAsync.convert()', () => {
        expect(commandTestToDeleteQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledOnce();
        expect(commandTestToDeleteQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(commandTestFixture);
      });

      it('should call entityRepository.nativeDelete()', () => {
        expect(entityRepositoryMock.nativeDelete).toHaveBeenCalledOnce();
        expect(entityRepositoryMock.nativeDelete).toHaveBeenCalledWith(deleteQueryMikroOrmTestFixture);
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

    describe('when called and entityRepository.nativeDelete throws an Error and isPostgreSqlErrorWithErrorType returns false', () => {
      let commandTestFixture: CommandTest;
      let deleteQueryMikroOrmTestFixture: ObjectQuery<ModelTest>;
      let errorFixture: unknown;
      let result: unknown;

      beforeAll(async () => {
        commandTestFixture = {
          foo: 'foo',
        };
        deleteQueryMikroOrmTestFixture = {
          foo: 'foo',
        };
        errorFixture = new Error('Error when entityRepository.nativeDelete is called');

        commandTestToDeleteQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          deleteQueryMikroOrmTestFixture,
        );
        entityRepositoryMock.nativeDelete.mockRejectedValueOnce(errorFixture);
        (isPostgreSqlErrorWithErrorType as unknown as Mock).mockReturnValueOnce(false);

        try {
          await deleteMikroOrmAdapter.delete(commandTestFixture);
        } catch (error: unknown) {
          result = error;
        }
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call commandTestToDeleteQueryMikroOrmConverterAsync.convert()', () => {
        expect(commandTestToDeleteQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledOnce();
        expect(commandTestToDeleteQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(commandTestFixture);
      });

      it('should call entityRepository.nativeDelete()', () => {
        expect(entityRepositoryMock.nativeDelete).toHaveBeenCalledOnce();
        expect(entityRepositoryMock.nativeDelete).toHaveBeenCalledWith(deleteQueryMikroOrmTestFixture);
      });

      it('should call isPostgreSqlErrorWithErrorType()', () => {
        expect(isPostgreSqlErrorWithErrorType).toHaveBeenCalledOnce();
        expect(isPostgreSqlErrorWithErrorType).toHaveBeenCalledWith(errorFixture, [
          PostgreSqlErrorType.FOREIGN_KEY_VIOLATION,
        ]);
      });

      it('should throw an Error', () => {
        expect(result).toBe(errorFixture);
      });
    });
  });
});
