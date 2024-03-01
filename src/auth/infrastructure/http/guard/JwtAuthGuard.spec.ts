import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FastifyRequest } from 'fastify';
import { expect, Mock, Mocked } from 'vitest';

import { JwtAuthGuard } from './JwtAuthGuard';
import { VerifyTokenCommand } from '../../../domain/command/VerifyTokenCommand';
import { AuthTokenPayload } from '../../../domain/model/AuthTokenPayload';
import { VerifyTokenCommandFixtures } from '../../../fixtures/domain/command/VerifyTokenCommandFixtures';
import { AuthTokenPayloadFixtures } from '../../../fixtures/domain/model/AuthTokenPayloadFixtures';
import { AuthorizedFastifyRequest } from '../model/AuthorizedFastifyRequest';

describe(JwtAuthGuard.name, () => {
  let commandBusMock: Mocked<CommandBus>;

  let jwtAuthGuard: JwtAuthGuard;

  beforeAll(() => {
    commandBusMock = {
      execute: vi.fn(),
    } as Partial<Mocked<CommandBus>> as Mocked<CommandBus>;

    jwtAuthGuard = new JwtAuthGuard(commandBusMock);
  });

  describe('.canActivate()', () => {
    describe('having a request with authorization header undefined', () => {
      describe('when called', () => {
        let requestFixture: FastifyRequest;
        let getRequestMock: Mock;
        let switchToHttpMock: Mock;
        let contextMock: ExecutionContext;
        let result: unknown;

        beforeAll(async () => {
          requestFixture = {
            headers: {
              authorization: undefined,
            },
          } as Partial<FastifyRequest> as FastifyRequest;
          getRequestMock = vi.fn().mockReturnValueOnce(requestFixture);
          switchToHttpMock = vi.fn().mockReturnValueOnce({
            getRequest: getRequestMock,
          });
          contextMock = {
            switchToHttp: switchToHttpMock,
          } as Partial<ExecutionContext> as ExecutionContext;

          try {
            result = await jwtAuthGuard.canActivate(contextMock);
          } catch (error) {
            result = error;
          }
        });

        afterAll(() => {
          vi.clearAllMocks();
        });

        it('should call context.switchToHttp()', () => {
          expect(switchToHttpMock).toHaveBeenCalledOnce();
        });

        it('should call context.switchToHttp().getRequest()', () => {
          expect(switchToHttpMock).toHaveBeenCalledOnce();
        });

        it('should throw an UnauthorizedException', () => {
          expect(result).toBeInstanceOf(UnauthorizedException);
        });
      });
    });

    describe('having a request with authorization header equal to "Bearer"', () => {
      describe('when called', () => {
        let requestFixture: FastifyRequest;
        let getRequestMock: Mock;
        let switchToHttpMock: Mock;
        let contextMock: ExecutionContext;
        let result: unknown;

        beforeAll(async () => {
          requestFixture = {
            headers: {
              authorization: 'Bearer ',
            },
          } as Partial<FastifyRequest> as FastifyRequest;
          getRequestMock = vi.fn().mockReturnValueOnce(requestFixture);
          switchToHttpMock = vi.fn().mockReturnValueOnce({
            getRequest: getRequestMock,
          });
          contextMock = {
            switchToHttp: switchToHttpMock,
          } as Partial<ExecutionContext> as ExecutionContext;

          try {
            result = await jwtAuthGuard.canActivate(contextMock);
          } catch (error) {
            result = error;
          }
        });

        afterAll(() => {
          vi.clearAllMocks();
        });

        it('should throw an UnauthorizedException', () => {
          expect(result).toBeInstanceOf(UnauthorizedException);
        });
      });
    });

    describe('when called', () => {
      let verifyTokenCommandFixture: VerifyTokenCommand;
      let requestFixture: FastifyRequest;
      let getRequestMock: Mock;
      let switchToHttpMock: Mock;
      let contextMock: ExecutionContext;
      let authTokenPayloadFixture: AuthTokenPayload;
      let result: unknown;

      beforeAll(async () => {
        verifyTokenCommandFixture = VerifyTokenCommandFixtures.any;
        requestFixture = {
          headers: {
            authorization: `Bearer ${verifyTokenCommandFixture.token}`,
          },
        } as Partial<FastifyRequest> as FastifyRequest;
        getRequestMock = vi.fn().mockReturnValueOnce(requestFixture);
        switchToHttpMock = vi.fn().mockReturnValueOnce({
          getRequest: getRequestMock,
        });
        contextMock = {
          switchToHttp: switchToHttpMock,
        } as Partial<ExecutionContext> as ExecutionContext;
        authTokenPayloadFixture = AuthTokenPayloadFixtures.any;

        commandBusMock.execute.mockResolvedValueOnce(authTokenPayloadFixture);

        try {
          result = await jwtAuthGuard.canActivate(contextMock);
        } catch (error) {
          result = error;
        }
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call commandBus.execute()', () => {
        expect(commandBusMock.execute).toHaveBeenCalledOnce();
        expect(commandBusMock.execute).toHaveBeenCalledWith(verifyTokenCommandFixture);
      });

      it('should set user property on request variable', () => {
        expect((requestFixture as AuthorizedFastifyRequest).user).toStrictEqual({
          email: authTokenPayloadFixture.user.email,
          id: authTokenPayloadFixture.user.id,
        });
      });

      it('should return true', () => {
        expect(result).toBe(true);
      });
    });
  });
});
