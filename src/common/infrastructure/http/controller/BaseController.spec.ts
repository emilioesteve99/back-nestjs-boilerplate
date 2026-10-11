import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Mocked } from 'vitest';
import { EntityNotFoundException } from '../../../domain/exception/EntityNotFoundException';
import { AnyEntity } from '../../../domain/model/AnyEntity';
import { AnyEntityFindOneQuery } from '../../../domain/query/AnyEntityFindOneQuery';
import { BaseController } from './BaseController';

class TestBaseController extends BaseController {
  public override async findOneOrThrowHttpException<TEntity>(
    query: AnyEntityFindOneQuery,
    exception?: HttpException,
  ): Promise<TEntity> {
    return super.findOneOrThrowHttpException(query, exception);
  }
}

describe(BaseController.name, () => {
  let queryBusMock: Mocked<QueryBus>;

  let testBaseController: TestBaseController;

  beforeEach(() => {
    queryBusMock = {
      execute: vi.fn(),
    } as Mocked<Partial<QueryBus>> as Mocked<QueryBus>;

    testBaseController = new TestBaseController(queryBusMock);
  });

  describe('.findOneOrThrowException()', () => {
    describe('having an exception not undefined', () => {
      describe('when called and entity is undefined', () => {
        let queryFixture: AnyEntityFindOneQuery;
        let exceptionFixture: HttpException;
        let result: unknown;

        beforeEach(async () => {
          queryFixture = {};
          exceptionFixture = new InternalServerErrorException();

          try {
            result = await testBaseController.findOneOrThrowHttpException(queryFixture, exceptionFixture);
          } catch (error) {
            result = error;
          }
        });

        afterEach(() => {
          vi.clearAllMocks();
        });

        it('should call queryBus.execute()', () => {
          expect(queryBusMock.execute).toHaveBeenCalledOnce();
          expect(queryBusMock.execute).toHaveBeenCalledWith(queryFixture);
        });

        it('should throw an InternalServerErrorException', () => {
          expect(result).toBeInstanceOf(InternalServerErrorException);
        });
      });
    });

    describe('when called and entity is undefined', () => {
      let queryFixture: AnyEntityFindOneQuery;
      let result: unknown;

      beforeEach(async () => {
        queryFixture = {};

        try {
          result = await testBaseController.findOneOrThrowHttpException(queryFixture);
        } catch (error) {
          result = error;
        }
      });

      afterEach(() => {
        vi.clearAllMocks();
      });

      it('should throw an EntityNotFoundException', () => {
        expect(result).toBeInstanceOf(EntityNotFoundException);
      });
    });

    describe('when called', () => {
      let queryFixture: AnyEntityFindOneQuery;
      let entityFixture: AnyEntity;
      let result: unknown;

      beforeEach(async () => {
        queryFixture = {};
        entityFixture = {};

        queryBusMock.execute.mockResolvedValueOnce(entityFixture);

        result = await testBaseController.findOneOrThrowHttpException(queryFixture);
      });

      afterEach(() => {
        vi.clearAllMocks();
      });

      it('should return an object', () => {
        expect(result).toStrictEqual(entityFixture);
      });
    });
  });
});
