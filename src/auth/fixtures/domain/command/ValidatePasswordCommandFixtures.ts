import { ValidatePasswordCommand } from '../../../domain/command/ValidatePasswordCommand';

export class ValidatePasswordCommandFixtures {
  public static get any(): ValidatePasswordCommand {
    const validatePasswordCommand: ValidatePasswordCommand = {
      actualPassword: 'anyActualPassword',
      passwordToTry: 'anyPasswordToTry',
    };

    return validatePasswordCommand;
  }
}
