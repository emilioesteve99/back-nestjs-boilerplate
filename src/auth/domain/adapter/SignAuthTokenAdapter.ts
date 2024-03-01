import { SignAuthTokenCommand } from '../command/SignAuthTokenCommand';

export interface SignAuthTokenAdapter {
  sign(input: SignAuthTokenCommand): Promise<string>;
}
