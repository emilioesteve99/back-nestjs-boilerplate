import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';

import { ManagerAsync } from '../../../common/domain/manager/ManagerAsync';
import { SignAuthTokenCommand } from '../../domain/command/SignAuthTokenCommand';
import { SignAuthTokenManager } from '../../domain/manager/SignAuthTokenManager';

@CommandHandler(SignAuthTokenCommand)
export class SignAuthTokenCommandHandler {
  public constructor(
    @Inject(SignAuthTokenManager)
    private readonly signAuthTokenManager: ManagerAsync<SignAuthTokenCommand, string>,
  ) {}

  public async execute(input: SignAuthTokenCommand): Promise<string> {
    const token: string = await this.signAuthTokenManager.manage(input);

    return token;
  }
}
