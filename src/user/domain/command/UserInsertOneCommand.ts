import { BaseEntityInsertOneCommand } from '../../../common/domain/command/BaseEntityInsertOneCommand';

export class UserInsertOneCommand implements BaseEntityInsertOneCommand {
  public readonly email!: string;
  public readonly name!: string;
  public readonly password!: string;

  public constructor(args: Required<UserInsertOneCommand>) {
    Object.assign(this, args);
  }
}
