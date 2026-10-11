import { Injectable } from '@nestjs/common';
import { InsertOneAdapter } from '../adapter/InsertOneAdapter';
import { ManagerAsync } from './ManagerAsync';

@Injectable()
export class InsertOneManager<TCommand, TModel> implements ManagerAsync<TCommand, TModel> {
  public constructor(private readonly insertOneAdapter: InsertOneAdapter<TCommand, TModel>) {}

  public async manage(command: TCommand): Promise<TModel> {
    const model: TModel = await this.insertOneAdapter.insertOne(command);

    return model;
  }
}
