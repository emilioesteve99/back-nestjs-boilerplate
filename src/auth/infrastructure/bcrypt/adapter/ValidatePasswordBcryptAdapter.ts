import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { ValidatePasswordAdapter } from '../../../domain/adapter/ValidatePasswordAdapter';
import { ValidatePasswordCommand } from '../../../domain/command/ValidatePasswordCommand';

@Injectable()
export class ValidatePasswordBcryptAdapter implements ValidatePasswordAdapter {
  public async validate(input: ValidatePasswordCommand): Promise<boolean> {
    const result: boolean = await bcrypt.compare(input.passwordToTry, input.actualPassword);

    return result;
  }
}
