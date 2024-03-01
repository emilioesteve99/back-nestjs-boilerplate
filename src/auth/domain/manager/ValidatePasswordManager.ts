import { Inject, Injectable } from '@nestjs/common';

import { ManagerAsync } from '../../../common/domain/manager/ManagerAsync';
import { ValidatePasswordBcryptAdapter } from '../../infrastructure/bcrypt/adapter/ValidatePasswordBcryptAdapter';
import { ValidatePasswordAdapter } from '../adapter/ValidatePasswordAdapter';
import { ValidatePasswordCommand } from '../command/ValidatePasswordCommand';

@Injectable()
export class ValidatePasswordManager implements ManagerAsync<ValidatePasswordCommand, boolean> {
  public constructor(
    @Inject(ValidatePasswordBcryptAdapter)
    private readonly validatePasswordAdapter: ValidatePasswordAdapter,
  ) {}
  public async manage(command: ValidatePasswordCommand): Promise<boolean> {
    const result: boolean = await this.validatePasswordAdapter.validate(command);

    return result;
  }
}
