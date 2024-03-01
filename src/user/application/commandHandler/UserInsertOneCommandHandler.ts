import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';

import { InsertOneCommandHandler } from '../../../common/application/commandHandler/InsertOneCommandHandler';
import { ManagerAsync } from '../../../common/domain/manager/ManagerAsync';
import { UserInsertOneCommand } from '../../domain/command/UserInsertOneCommand';
import { InsertOneUserManager } from '../../domain/manager/InsertOneUserManager';
import { User } from '../../domain/model/User';

@CommandHandler(UserInsertOneCommand)
export class UserInsertOneCommandHandler extends InsertOneCommandHandler<UserInsertOneCommand, User> {
  public constructor(
    @Inject(InsertOneUserManager)
    insertOneUserManager: ManagerAsync<UserInsertOneCommand, User>,
  ) {
    super(insertOneUserManager);
  }
}
