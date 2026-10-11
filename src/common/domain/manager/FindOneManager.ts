import { Injectable } from '@nestjs/common';
import { FindOneAdapter } from '../adapter/FindOneAdapter';
import { ManagerAsync } from './ManagerAsync';

@Injectable()
export class FindOneManager<TQuery, TModel> implements ManagerAsync<TQuery, TModel | undefined> {
  public constructor(private readonly findOneAdapter: FindOneAdapter<TQuery, TModel>) {}

  public async manage(query: TQuery): Promise<TModel | undefined> {
    const modelOrUndefined: TModel | undefined = await this.findOneAdapter.findOne(query);

    return modelOrUndefined;
  }
}
