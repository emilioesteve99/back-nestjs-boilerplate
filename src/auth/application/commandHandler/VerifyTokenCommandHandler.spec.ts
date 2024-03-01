import { Mocked } from 'vitest';

import { SignAuthTokenCommandHandler } from './SignAuthTokenCommandHandler';
import { VerifyTokenCommandHandler } from './VerifyTokenCommandHandler';
import { Manager } from '../../../common/domain/manager/Manager';
import { VerifyTokenCommand } from '../../domain/command/VerifyTokenCommand';
import { AuthTokenPayload } from '../../domain/model/AuthTokenPayload';
import { VerifyTokenCommandFixtures } from '../../fixtures/domain/command/VerifyTokenCommandFixtures';
import { AuthTokenPayloadFixtures } from '../../fixtures/domain/model/AuthTokenPayloadFixtures';

describe(SignAuthTokenCommandHandler.name, () => {
  let verifyTokenManagerMock: Mocked<Manager<VerifyTokenCommand, AuthTokenPayload>>;

  let verifyTokenCommandHandler: VerifyTokenCommandHandler;

  beforeAll(() => {
    verifyTokenManagerMock = {
      manage: vi.fn(),
    };

    verifyTokenCommandHandler = new VerifyTokenCommandHandler(verifyTokenManagerMock);
  });

  describe('.handle()', () => {
    describe('when called', () => {
      let verifyTokenCommandFixture: VerifyTokenCommand;
      let authTokenPayloadFixture: AuthTokenPayload;
      let result: unknown;

      beforeAll(async () => {
        verifyTokenCommandFixture = VerifyTokenCommandFixtures.any;
        authTokenPayloadFixture = AuthTokenPayloadFixtures.any;

        verifyTokenManagerMock.manage.mockReturnValueOnce(authTokenPayloadFixture);

        result = await verifyTokenCommandHandler.execute(verifyTokenCommandFixture);
      });

      it('should call verifyTokenManager.manage()', () => {
        expect(verifyTokenManagerMock.manage).toHaveBeenCalledOnce();
        expect(verifyTokenManagerMock.manage).toHaveBeenCalledWith(verifyTokenCommandFixture);
      });

      it('should return a string', () => {
        expect(result).toBe(authTokenPayloadFixture);
      });
    });
  });
});
