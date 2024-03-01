import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FastifyRequest } from 'fastify';

import { VerifyTokenCommand } from '../../../domain/command/VerifyTokenCommand';
import { AuthTokenPayload } from '../../../domain/model/AuthTokenPayload';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  public constructor(private readonly commandBus: CommandBus) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: FastifyRequest = context.switchToHttp().getRequest();
    const token: string | undefined = this.extractTokenFromHeader(request);

    if (token === undefined || token.trim() === '') {
      throw new UnauthorizedException();
    }

    const authTokenPayload: AuthTokenPayload = await this.commandBus.execute(
      new VerifyTokenCommand({
        token,
      }),
    );

    Object.assign(request, {
      user: {
        email: authTokenPayload.user.email,
        id: authTokenPayload.user.id,
      },
    });

    return true;
  }

  private extractTokenFromHeader(request: FastifyRequest): string | undefined {
    const [, token] = request.headers.authorization?.split('Bearer ') ?? [];
    return token;
  }
}
