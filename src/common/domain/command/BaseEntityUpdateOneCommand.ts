import { BaseEntityFindQuery } from '../query/BaseEntityFindQuery';
import { BaseEntitySetCommand } from './BaseEntitySetCommand';

export interface BaseEntityUpdateOneCommand {
  findQuery: BaseEntityFindQuery;
  setCommand: BaseEntitySetCommand;
}
