import { BaseEntityUpdateOneCommand } from '../../../domain/command/BaseEntityUpdateOneCommand';
import { BaseEntityFindQueryFixtures } from '../query/BaseEntityFindQueryFixtures';
import { BaseEntitySetCommandFixtures } from './BaseEntitySetCommandFixtures';

export class BaseEntityUpdateOneCommandFixtures {
  public static get any(): BaseEntityUpdateOneCommand {
    const baseEntityUpdateOneCommand: BaseEntityUpdateOneCommand = {
      findQuery: BaseEntityFindQueryFixtures.any,
      setCommand: BaseEntitySetCommandFixtures.any,
    };

    return baseEntityUpdateOneCommand;
  }
}
