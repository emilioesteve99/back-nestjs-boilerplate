import { Injectable } from '@nestjs/common';
import { UpdateOneAdapter } from '../adapter/UpdateOneAdapter';
import { ManagerAsync } from './ManagerAsync';

@Injectable()
export class UpdateOneManager<TCommand> implements ManagerAsync<TCommand, void> {
  public constructor(private readonly updateOneAdapter: UpdateOneAdapter<TCommand>) {}

  public async manage(command: TCommand): Promise<void> {
    await this.updateOneAdapter.updateOne(command);
  }
}
