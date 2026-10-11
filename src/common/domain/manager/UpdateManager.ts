import { Injectable } from '@nestjs/common';
import { UpdateAdapter } from '../adapter/UpdateAdapter';
import { ManagerAsync } from './ManagerAsync';

@Injectable()
export class UpdateManager<TCommand> implements ManagerAsync<TCommand, void> {
  public constructor(private readonly updateAdapter: UpdateAdapter<TCommand>) {}

  public async manage(command: TCommand): Promise<void> {
    await this.updateAdapter.update(command);
  }
}
