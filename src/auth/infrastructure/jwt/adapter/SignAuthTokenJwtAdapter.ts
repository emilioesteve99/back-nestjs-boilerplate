import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

import { SignAuthTokenAdapter } from '../../../domain/adapter/SignAuthTokenAdapter';
import { SignAuthTokenCommand } from '../../../domain/command/SignAuthTokenCommand';

@Injectable()
export class SignAuthTokenJwtAdapter implements SignAuthTokenAdapter {
  public async sign(input: SignAuthTokenCommand): Promise<string> {
    // TODO: Replace secret with configuration variable
    const token: string = sign(input.payload, 'secret-example', {
      expiresIn: '24h',
    });

    return token;
  }
}
