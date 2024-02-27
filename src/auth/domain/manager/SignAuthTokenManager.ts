import { Inject, Injectable } from '@nestjs/common';

import { ManagerAsync } from '../../../common/domain/manager/ManagerAsync';
import { SignAuthTokenJwtAdapter } from '../../infrastructure/jwt/adapter/SignAuthTokenJwtAdapter';
import { SignAuthTokenAdapter } from '../adapter/SignAuthTokenAdapter';
import { SignAuthTokenCommand } from '../command/SignAuthTokenCommand';

@Injectable()
export class SignAuthTokenManager implements ManagerAsync<SignAuthTokenCommand, string> {
  public constructor(
    @Inject(SignAuthTokenJwtAdapter)
    private readonly signAuthTokenAdapter: SignAuthTokenAdapter,
  ) {}

  public async manage(input: SignAuthTokenCommand): Promise<string> {
    const token: string = await this.signAuthTokenAdapter.sign(input);

    return token;
  }
}
