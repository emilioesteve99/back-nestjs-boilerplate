import { VerifyTokenCommand } from '../../../domain/command/VerifyTokenCommand';

export class VerifyTokenCommandFixtures {
  public static get any(): VerifyTokenCommand {
    const verifyTokenCommand: VerifyTokenCommand = {
      token: 'token-example',
    };

    return verifyTokenCommand;
  }
}
