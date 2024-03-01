import { Mocked } from 'vitest';

import { SignAuthTokenManager } from './SignAuthTokenManager';
import { SignAuthTokenCommandFixtures } from '../../fixtures/domain/command/SignAuthTokenCommandFixtures';
import { SignAuthTokenAdapter } from '../adapter/SignAuthTokenAdapter';
import { SignAuthTokenCommand } from '../command/SignAuthTokenCommand';

describe(SignAuthTokenManager.name, () => {
  let signAuthTokenAdapterMock: Mocked<SignAuthTokenAdapter>;

  let signAuthTokenManager: SignAuthTokenManager;

  beforeAll(() => {
    signAuthTokenAdapterMock = {
      sign: vi.fn(),
    };

    signAuthTokenManager = new SignAuthTokenManager(signAuthTokenAdapterMock);
  });

  describe('.manage()', () => {
    describe('when called', () => {
      let signAuthTokenCommandFixture: SignAuthTokenCommand;
      let tokenFixture: string;
      let result: unknown;

      beforeAll(async () => {
        signAuthTokenCommandFixture = SignAuthTokenCommandFixtures.any;
        tokenFixture = 'token-example';

        signAuthTokenAdapterMock.sign.mockResolvedValue(tokenFixture);

        result = await signAuthTokenManager.manage(signAuthTokenCommandFixture);
      });

      it('should call signAuthTokenAdapter.sign()', () => {
        expect(signAuthTokenAdapterMock.sign).toHaveBeenCalledOnce();
        expect(signAuthTokenAdapterMock.sign).toHaveBeenCalledWith(signAuthTokenCommandFixture);
      });

      it('should return a string', () => {
        expect(result).toBe(tokenFixture);
      });
    });
  });
});
