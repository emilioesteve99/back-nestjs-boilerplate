import { ValidatePasswordCommand } from '../command/ValidatePasswordCommand';

export interface ValidatePasswordAdapter {
  validate(input: ValidatePasswordCommand): Promise<boolean>;
}
