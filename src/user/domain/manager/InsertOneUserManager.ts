import { Inject, Injectable } from '@nestjs/common';

import { InsertOneAdapter } from '../../../common/domain/adapter/InsertOneAdapter';
import { InsertOneManager } from '../../../common/domain/manager/InsertOneManager';
import { EncryptUserPasswordBcryptAdapter } from '../../infrastructure/bcrypt/adapter/EncryptUserPasswordBcryptAdapter';
import { InsertOneUserMikroOrmAdapter } from '../../infrastructure/mikroOrm/adapter/InsertOneUserMikroOrmAdapter';
import { EncryptUserPasswordAdapter } from '../adapter/EncryptUserPasswordAdapter';
import { UserInsertOneCommand } from '../command/UserInsertOneCommand';
import { User } from '../model/User';

@Injectable()
export class InsertOneUserManager extends InsertOneManager<UserInsertOneCommand, User> {
  public constructor(
    @Inject(InsertOneUserMikroOrmAdapter)
    insertOneUserMikroOrmAdapter: InsertOneAdapter<UserInsertOneCommand, User>,
    @Inject(EncryptUserPasswordBcryptAdapter)
    private readonly encryptUserPasswordAdapter: EncryptUserPasswordAdapter,
  ) {
    super(insertOneUserMikroOrmAdapter);
  }

  public override async manage(command: UserInsertOneCommand): Promise<User> {
    const encryptedPassword: string = await this.encryptUserPasswordAdapter.encrypt(command);

    const userInsertOneCommand: UserInsertOneCommand = new UserInsertOneCommand({
      ...command,
      password: encryptedPassword,
    });

    const user: User = await super.manage(userInsertOneCommand);

    return user;
  }
}
