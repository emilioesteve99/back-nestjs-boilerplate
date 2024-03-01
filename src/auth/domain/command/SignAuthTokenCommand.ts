import { ICommand } from '@nestjs/cqrs';

import { AuthTokenPayload } from '../model/AuthTokenPayload';

export class SignAuthTokenCommand implements ICommand {
  public readonly payload!: AuthTokenPayload;

  public constructor(args: Required<SignAuthTokenCommand>) {
    Object.assign(this, args);
  }
}
