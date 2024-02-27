import { ConflictException, Injectable } from '@nestjs/common';
import { IQuery, QueryBus } from '@nestjs/cqrs';

import { EntityNotFoundException } from '../../../domain/exception/EntityNotFoundException';

@Injectable()
export class BaseController {
  public constructor(protected readonly queryBus: QueryBus) {}

  protected async findOneOrThrowEntityNotFoundException<TEntity>(query: IQuery, message?: string): Promise<TEntity> {
    const entity: TEntity | undefined = await this.queryBus.execute(query);

    if (entity === undefined) {
      throw new EntityNotFoundException(message ?? 'Entity not found exception');
    }

    return entity;
  }

  protected async findOneAndThrowConflictExceptionException<TEntity>(query: IQuery, message?: string): Promise<void> {
    const entity: TEntity | undefined = await this.queryBus.execute(query);

    if (entity !== undefined) {
      throw new ConflictException(message ?? 'Conflict exception');
    }
  }
}
