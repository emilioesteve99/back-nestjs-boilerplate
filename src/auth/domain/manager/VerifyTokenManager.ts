import { Inject, Injectable } from '@nestjs/common';

import { Manager } from '../../../common/domain/manager/Manager';
import { VerifyTokenJwtAdapter } from '../../infrastructure/jwt/adapter/VerifyTokenJwtAdapter';
import { VerifyTokenAdapter } from '../adapter/VerifyTokenAdapter';
import { VerifyTokenCommand } from '../command/VerifyTokenCommand';
import { AuthTokenPayload } from '../model/AuthTokenPayload';

@Injectable()
export class VerifyTokenManager implements Manager<VerifyTokenCommand, AuthTokenPayload> {
  public constructor(
    @Inject(VerifyTokenJwtAdapter)
    private readonly verifyTokenAdapter: VerifyTokenAdapter,
  ) {}

  public manage(input: VerifyTokenCommand): AuthTokenPayload {
    const authTokenPayload: AuthTokenPayload = this.verifyTokenAdapter.verify(input);

    return authTokenPayload;
  }
}
