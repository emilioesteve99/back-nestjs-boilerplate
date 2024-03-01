import { sign } from 'jsonwebtoken';
import { expect, Mock } from 'vitest';

import { SignAuthTokenJwtAdapter } from './SignAuthTokenJwtAdapter';
import { SignAuthTokenCommand } from '../../../domain/command/SignAuthTokenCommand';
import { SIGN_TOKEN_SECRET } from '../../../domain/model/AuthConstants';
import { SignAuthTokenCommandFixtures } from '../../../fixtures/domain/command/SignAuthTokenCommandFixtures';

vi.mock('jsonwebtoken', async () => ({
  ...(await vi.importActual('jsonwebtoken')),
  sign: vi.fn(),
}));

describe(SignAuthTokenJwtAdapter.name, () => {
  let signAuthTokenJwtAdapter: SignAuthTokenJwtAdapter;

  beforeAll(() => {
    signAuthTokenJwtAdapter = new SignAuthTokenJwtAdapter();
  });

  describe('.validate()', () => {
    describe('when called', () => {
      let signAuthTokenCommandFixture: SignAuthTokenCommand;
      let tokenFixture: string;
      let result: unknown;

      beforeAll(async () => {
        signAuthTokenCommandFixture = SignAuthTokenCommandFixtures.any;
        tokenFixture = 'token-example';

        (sign as unknown as Mock).mockReturnValueOnce(tokenFixture);

        result = await signAuthTokenJwtAdapter.sign(signAuthTokenCommandFixture);
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call sign()', () => {
        expect(sign).toHaveBeenCalledOnce();
        expect(sign).toHaveBeenCalledWith(signAuthTokenCommandFixture.payload, SIGN_TOKEN_SECRET, {
          expiresIn: '24h',
        });
      });

      it('should return a string', () => {
        expect(result).toBe(tokenFixture);
      });
    });
  });
});
