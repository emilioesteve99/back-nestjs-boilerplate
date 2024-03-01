import { UserInsertOneCommand } from '../../../domain/command/UserInsertOneCommand';
import { UserFixtures } from '../model/UserFixtures';

export class UserInsertOneCommandFixtures {
  public static get any(): UserInsertOneCommand {
    const userInsertOneCommand: UserInsertOneCommand = new UserInsertOneCommand({
      email: UserFixtures.any.email,
      name: UserFixtures.any.name,
      password: UserFixtures.any.password,
    });

    return userInsertOneCommand;
  }
}
