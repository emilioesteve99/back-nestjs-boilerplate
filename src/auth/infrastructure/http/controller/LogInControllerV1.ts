import { Body, Controller, Post, UnauthorizedException, Version } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { BaseController } from '../../../../common/infrastructure/http/controller/BaseController';
import { User } from '../../../../user/domain/model/User';
import { UserFindOneQuery } from '../../../../user/domain/query/UserFindOneQuery';
import { SignAuthTokenCommand } from '../../../domain/command/SignAuthTokenCommand';
import { ValidatePasswordCommand } from '../../../domain/command/ValidatePasswordCommand';
import { LogInHttpV1 } from '../model/LogInHttpV1';
import { LogInResponseHttpV1 } from '../model/LogInResponseHttpV1';

@Controller('auth')
export class LogInControllerV1 extends BaseController {
  public constructor(
    private readonly commandBus: CommandBus,
    queryBus: QueryBus,
  ) {
    super(queryBus);
  }

  @Version('1')
  @Post('log-ins')
  public async logIn(@Body() body: LogInHttpV1): Promise<LogInResponseHttpV1> {
    const user: User = await this.findOneOrThrowHttpException(
      new UserFindOneQuery({
        email: body.email,
      }),
      new UnauthorizedException(),
    );

    const isValidPassword: boolean = await this.commandBus.execute(
      new ValidatePasswordCommand({
        actualPassword: user.password,
        passwordToTry: body.password,
      }),
    );

    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    const token: string = await this.commandBus.execute(
      new SignAuthTokenCommand({
        payload: {
          user: {
            email: user.email,
            id: user.id,
          },
        },
      }),
    );

    const response: LogInResponseHttpV1 = {
      token,
    };

    return response;
  }
}
