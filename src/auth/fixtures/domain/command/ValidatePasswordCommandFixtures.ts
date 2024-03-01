import { ValidatePasswordCommand } from '../../../domain/command/ValidatePasswordCommand';

export class ValidatePasswordCommandFixtures {
  public static get any(): ValidatePasswordCommand {
    const validatePasswordCommand: ValidatePasswordCommand = {
      actualPassword: 'password-example',
      passwordToTry: 'password-example',
    };

    return validatePasswordCommand;
  }
}
