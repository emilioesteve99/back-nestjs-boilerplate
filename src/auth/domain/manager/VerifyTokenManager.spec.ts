import { Mocked } from 'vitest';

import { VerifyTokenManager } from './VerifyTokenManager';
import { VerifyTokenCommandFixtures } from '../../fixtures/domain/command/VerifyTokenCommandFixtures';
import { AuthTokenPayloadFixtures } from '../../fixtures/domain/model/AuthTokenPayloadFixtures';
import { VerifyTokenAdapter } from '../adapter/VerifyTokenAdapter';
import { VerifyTokenCommand } from '../command/VerifyTokenCommand';
import { AuthTokenPayload } from '../model/AuthTokenPayload';

describe(VerifyTokenManager.name, () => {
  let verifyTokenAdapter: Mocked<VerifyTokenAdapter>;

  let verifyTokenAdapterManager: VerifyTokenManager;

  beforeAll(() => {
    verifyTokenAdapter = {
      verify: vi.fn(),
    };

    verifyTokenAdapterManager = new VerifyTokenManager(verifyTokenAdapter);
  });

  describe('.handle()', () => {
    describe('when called', () => {
      let verifyTokenCommandFixture: VerifyTokenCommand;
      let authTokenPayloadFixture: AuthTokenPayload;
      let result: unknown;

      beforeAll(async () => {
        verifyTokenCommandFixture = VerifyTokenCommandFixtures.any;
        authTokenPayloadFixture = AuthTokenPayloadFixtures.any;

        verifyTokenAdapter.verify.mockReturnValueOnce(authTokenPayloadFixture);

        result = verifyTokenAdapterManager.manage(verifyTokenCommandFixture);
      });

      it('should call verifyTokenAdapter.verify()', () => {
        expect(verifyTokenAdapter.verify).toHaveBeenCalledOnce();
        expect(verifyTokenAdapter.verify).toHaveBeenCalledWith(verifyTokenCommandFixture);
      });

      it('should return a string', () => {
        expect(result).toBe(authTokenPayloadFixture);
      });
    });
  });
});
