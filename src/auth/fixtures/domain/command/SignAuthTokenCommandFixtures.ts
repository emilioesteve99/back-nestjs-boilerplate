import { SignAuthTokenCommand } from '../../../domain/command/SignAuthTokenCommand';
import { AuthTokenPayloadFixtures } from '../model/AuthTokenPayloadFixtures';

export class SignAuthTokenCommandFixtures {
  public static get any(): SignAuthTokenCommand {
    const signAuthTokenCommand: SignAuthTokenCommand = {
      payload: AuthTokenPayloadFixtures.any,
    };

    return signAuthTokenCommand;
  }
}
