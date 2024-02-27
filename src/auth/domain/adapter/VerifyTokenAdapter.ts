import { VerifyTokenCommand } from '../command/VerifyTokenCommand';
import { AuthTokenPayload } from '../model/AuthTokenPayload';

export interface VerifyTokenAdapter {
  verify(input: VerifyTokenCommand): AuthTokenPayload;
}
