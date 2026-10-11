import { Injectable } from '@nestjs/common';
import { IQuery } from '@nestjs/cqrs';

import { Manager } from '../../domain/manager/Manager';
import { ManagerAsync } from '../../domain/manager/ManagerAsync';

@Injectable()
export class FindOneQueryHandler<TQuery extends IQuery, TModel> {
  public constructor(
    private readonly findOneManager: Manager<TQuery, TModel | undefined> | ManagerAsync<TQuery, TModel | undefined>,
  ) {}

  public async execute(query: TQuery): Promise<TModel | undefined> {
    const modelOrUndefined: TModel | undefined = await this.findOneManager.manage(query);

    return modelOrUndefined;
  }
}
