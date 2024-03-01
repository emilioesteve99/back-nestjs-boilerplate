import { UnauthorizedException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Mocked } from 'vitest';

import { LogInControllerV1 } from './LogInControllerV1';
import { User } from '../../../../user/domain/model/User';
import { UserFixtures } from '../../../../user/fixtures/domain/model/UserFixtures';
import { SignAuthTokenCommand } from '../../../domain/command/SignAuthTokenCommand';
import { ValidatePasswordCommand } from '../../../domain/command/ValidatePasswordCommand';
import { SignAuthTokenCommandFixtures } from '../../../fixtures/domain/command/SignAuthTokenCommandFixtures';
import { ValidatePasswordCommandFixtures } from '../../../fixtures/domain/command/ValidatePasswordCommandFixtures';
import { LogInHttpV1Fixtures } from '../../../fixtures/infrastructure/http/model/LogInHttpV1Fixtures';
import { LogInHttpV1 } from '../model/LogInHttpV1';

describe(LogInControllerV1.name, () => {
  let commandBusMock: Mocked<CommandBus>;
  let queryBusMock: Mocked<QueryBus>;

  let logInControllerV1: LogInControllerV1;

  beforeAll(() => {
    commandBusMock = {
      execute: vi.fn(),
    } as Partial<Mocked<CommandBus>> as Mocked<CommandBus>;

    queryBusMock = {
      execute: vi.fn(),
    } as Partial<Mocked<QueryBus>> as Mocked<QueryBus>;

    logInControllerV1 = new LogInControllerV1(commandBusMock, queryBusMock);
  });

  describe('.logIn()', () => {
    describe('when called and isValidPassword is false', () => {
      let bodyFixture: LogInHttpV1;
      let userFixture: User;
      let validatePasswordCommandFixture: ValidatePasswordCommand;
      let isValidPasswordFixture: boolean;
      let result: unknown;

      beforeAll(async () => {
        bodyFixture = LogInHttpV1Fixtures.any;
        userFixture = UserFixtures.any;
        validatePasswordCommandFixture = ValidatePasswordCommandFixtures.any;
        isValidPasswordFixture = false;

        queryBusMock.execute.mockResolvedValueOnce(userFixture);
        commandBusMock.execute.mockResolvedValueOnce(isValidPasswordFixture);

        try {
          result = await logInControllerV1.logIn(bodyFixture);
        } catch (error) {
          result = error;
        }
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call commandBus.execute()', () => {
        expect(commandBusMock.execute).toHaveBeenCalledOnce();
        expect(commandBusMock.execute).toHaveBeenCalledWith(validatePasswordCommandFixture);
      });

      it('should throw an UnauthorizedException', () => {
        expect(result).toBeInstanceOf(UnauthorizedException);
      });
    });

    describe('when called', () => {
      let bodyFixture: LogInHttpV1;
      let userFixture: User;
      let validatePasswordCommandFixture: ValidatePasswordCommand;
      let isValidPasswordFixture: boolean;
      let signAuthTokenCommandFixture: SignAuthTokenCommand;
      let tokenFixture: string;
      let result: unknown;

      beforeAll(async () => {
        bodyFixture = LogInHttpV1Fixtures.any;
        userFixture = UserFixtures.any;
        validatePasswordCommandFixture = ValidatePasswordCommandFixtures.any;
        isValidPasswordFixture = true;
        signAuthTokenCommandFixture = SignAuthTokenCommandFixtures.any;
        tokenFixture = 'token-example';

        queryBusMock.execute.mockResolvedValueOnce(userFixture);
        commandBusMock.execute.mockResolvedValueOnce(isValidPasswordFixture);
        commandBusMock.execute.mockResolvedValueOnce(tokenFixture);

        result = await logInControllerV1.logIn(bodyFixture);
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call commandBus.execute()', () => {
        expect(commandBusMock.execute).toHaveBeenCalledTimes(2);
        expect(commandBusMock.execute).toHaveBeenNthCalledWith(1, validatePasswordCommandFixture);
        expect(commandBusMock.execute).toHaveBeenNthCalledWith(2, signAuthTokenCommandFixture);
      });

      it('should return a LogInResponseHttpV1', () => {
        expect(result).toStrictEqual({
          token: tokenFixture,
        });
      });
    });
  });
});
