import { Injectable } from '@nestjs/common';

import { BaseController } from '../../../../common/infrastructure/http/controller/BaseController';
import { User } from '../../../domain/model/User';

@Injectable()
export class BaseUserController extends BaseController {
  protected fakeUserPassword(input: User): User {
    const user: User = { ...input };
    user.password = 'fake-user-password-example';
    return user;
  }

  protected fakeUsersPassword(input: User[]): User[] {
    const users: User[] = input.map((user: User) => this.fakeUserPassword(user));

    return users;
  }
}
