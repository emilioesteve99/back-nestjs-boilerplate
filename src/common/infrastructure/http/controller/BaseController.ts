import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { EntityNotFoundException } from '../../../domain/exception/EntityNotFoundException';
import { AnyEntityFindOneQuery } from '../../../domain/query/AnyEntityFindOneQuery';

@Injectable()
export class BaseController {
  public constructor(protected readonly queryBus: QueryBus) {}

  protected async findOneOrThrowException<TEntity>(query: AnyEntityFindOneQuery, exception?: Error): Promise<TEntity> {
    const entity: TEntity | undefined = await this.queryBus.execute(query);

    if (entity === undefined) {
      throw exception ?? new EntityNotFoundException('Entity not found exception');
    }

    return entity;
  }
}
