import { Body, Controller, Post, Version } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import { BaseUserController } from './BaseUserController';
import { UserInsertOneCommand } from '../../../domain/command/UserInsertOneCommand';
import { User } from '../../../domain/model/User';
import { InsertOneUserHttpV1 } from '../model/InsertOneUserHttpV1';

@ApiTags('Users')
@Controller('users')
export class InsertOneUserControllerV1 extends BaseUserController {
  public constructor(
    private readonly commandBus: CommandBus,
    queryBus: QueryBus,
  ) {
    super(queryBus);
  }

  @Version('1')
  @Post()
  public async insertOne(@Body() body: InsertOneUserHttpV1): Promise<User> {
    let user: User = await this.commandBus.execute(
      new UserInsertOneCommand({
        email: body.email,
        name: body.name,
        password: body.password,
      }),
    );

    user = this.fakeUserPassword(user);

    return user;
  }
}
