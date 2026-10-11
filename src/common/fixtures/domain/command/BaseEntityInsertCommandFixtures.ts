import { BaseEntityInsertCommand } from '../../../domain/command/BaseEntityInsertCommand';
import { BaseEntityInsertOneCommandFixtures } from './BaseEntityInsertOneCommandFixtures';

export class BaseEntityInsertCommandFixtures {
  public static get any(): BaseEntityInsertCommand {
    const baseEntityInsertCommand: BaseEntityInsertCommand = {
      commands: [],
    };

    return baseEntityInsertCommand;
  }

  public static get withCommandsNotEmpty(): BaseEntityInsertCommand {
    const baseEntityInsertCommand: BaseEntityInsertCommand = {
      ...BaseEntityInsertCommandFixtures.any,
      commands: [BaseEntityInsertOneCommandFixtures.any],
    };

    return baseEntityInsertCommand;
  }
}
