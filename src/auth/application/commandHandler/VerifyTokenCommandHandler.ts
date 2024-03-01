import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Manager } from '../../../common/domain/manager/Manager';
import { VerifyTokenCommand } from '../../domain/command/VerifyTokenCommand';
import { VerifyTokenManager } from '../../domain/manager/VerifyTokenManager';
import { AuthTokenPayload } from '../../domain/model/AuthTokenPayload';

@CommandHandler(VerifyTokenCommand)
export class VerifyTokenCommandHandler implements ICommandHandler<VerifyTokenCommand, AuthTokenPayload> {
  public constructor(
    @Inject(VerifyTokenManager)
    private readonly verifyTokenManager: Manager<VerifyTokenCommand, AuthTokenPayload>,
  ) {}
  public async execute(command: VerifyTokenCommand): Promise<AuthTokenPayload> {
    const authTokenPayload: AuthTokenPayload = this.verifyTokenManager.manage(command);

    return authTokenPayload;
  }
}
