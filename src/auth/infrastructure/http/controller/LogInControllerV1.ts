import { Body, Controller, Post, UnauthorizedException, Version } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { BaseController } from '../../../../common/infrastructure/http/controller/BaseController';
import { User } from '../../../../user/domain/model/User';
import { UserFindOneQuery } from '../../../../user/domain/query/UserFindOneQuery';
import { SignAuthTokenCommand } from '../../../domain/command/SignAuthTokenCommand';
import { ValidatePasswordCommand } from '../../../domain/command/ValidatePasswordCommand';
import { LoginHttpV1 } from '../model/LoginHttpV1';
import { LoginResponseHttpV1 } from '../model/LoginResponseHttpV1';

@Controller('auth')
export class LogInControllerV1 extends BaseController {
  private readonly unauthorizedException: UnauthorizedException = new UnauthorizedException('Invalid credentials');

  public constructor(
    private readonly commandBus: CommandBus,
    queryBus: QueryBus,
  ) {
    super(queryBus);
  }

  @Version('1')
  @Post('log-ins')
  public async logIn(@Body() body: LoginHttpV1): Promise<LoginResponseHttpV1> {
    const user: User = await this.findOneOrThrowException(
      new UserFindOneQuery({
        email: body.email,
      }),
      this.unauthorizedException,
    );

    const isValidPassword: boolean = await this.commandBus.execute(
      new ValidatePasswordCommand({
        actualPassword: user.password,
        passwordToTry: body.password,
      }),
    );

    if (!isValidPassword) {
      throw this.unauthorizedException;
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

    const response: LoginResponseHttpV1 = {
      token,
    };

    return response;
  }
}
