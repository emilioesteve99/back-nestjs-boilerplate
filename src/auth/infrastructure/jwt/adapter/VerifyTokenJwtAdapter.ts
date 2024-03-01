import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload, verify } from 'jsonwebtoken';

import { VerifyTokenAdapter } from '../../../domain/adapter/VerifyTokenAdapter';
import { VerifyTokenCommand } from '../../../domain/command/VerifyTokenCommand';
import { SIGN_TOKEN_SECRET } from '../../../domain/model/AuthConstants';
import { AuthTokenPayload } from '../../../domain/model/AuthTokenPayload';

@Injectable()
export class VerifyTokenJwtAdapter implements VerifyTokenAdapter {
  public verify(input: VerifyTokenCommand): AuthTokenPayload {
    try {
      const payload: AuthTokenPayload & JwtPayload = verify(input.token, SIGN_TOKEN_SECRET) as AuthTokenPayload &
        JwtPayload;

      const authTokenPayload: AuthTokenPayload = {
        user: {
          email: payload.user.email,
          id: payload.user.id,
        },
      };

      return authTokenPayload;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
