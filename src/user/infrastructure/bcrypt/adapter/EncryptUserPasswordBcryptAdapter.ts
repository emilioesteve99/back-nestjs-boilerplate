import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { EncryptUserPasswordAdapter } from '../../../domain/adapter/EncryptUserPasswordAdapter';
import { UserInsertOneCommand } from '../../../domain/command/UserInsertOneCommand';

@Injectable()
export class EncryptUserPasswordBcryptAdapter implements EncryptUserPasswordAdapter {
  public async encrypt(input: UserInsertOneCommand): Promise<string> {
    const encryptedPassword: string = await bcrypt.hash(input.password, 9);

    return encryptedPassword;
  }
}
