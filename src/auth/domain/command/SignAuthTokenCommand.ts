import { AuthTokenPayload } from '../model/AuthTokenPayload';

export class SignAuthTokenCommand {
  public readonly payload!: AuthTokenPayload;

  public constructor(args: Required<SignAuthTokenCommand>) {
    Object.assign(this, args);
  }
}
