import { UnauthorizedException } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { expect, Mock } from 'vitest';

import { VerifyTokenJwtAdapter } from './VerifyTokenJwtAdapter';
import { VerifyTokenCommand } from '../../../domain/command/VerifyTokenCommand';
import { SIGN_TOKEN_SECRET } from '../../../domain/model/AuthConstants';
import { AuthTokenPayload } from '../../../domain/model/AuthTokenPayload';
import { VerifyTokenCommandFixtures } from '../../../fixtures/domain/command/VerifyTokenCommandFixtures';
import { AuthTokenPayloadFixtures } from '../../../fixtures/domain/model/AuthTokenPayloadFixtures';

vi.mock('jsonwebtoken', async () => ({
  ...(await vi.importActual('jsonwebtoken')),
  verify: vi.fn(),
}));

describe(VerifyTokenJwtAdapter.name, () => {
  let verifyTokenJwtAdapter: VerifyTokenJwtAdapter;

  beforeAll(() => {
    verifyTokenJwtAdapter = new VerifyTokenJwtAdapter();
  });

  describe('.validate()', () => {
    describe('when called and verify() throws an Exception', () => {
      let verifyTokenCommandFixture: VerifyTokenCommand;
      let result: unknown;

      beforeAll(async () => {
        verifyTokenCommandFixture = VerifyTokenCommandFixtures.any;

        (verify as unknown as Mock).mockImplementationOnce(() => {
          throw new Error();
        });

        try {
          result = verifyTokenJwtAdapter.verify(verifyTokenCommandFixture);
        } catch (error) {
          result = error;
        }
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call verify()', () => {
        expect(verify).toHaveBeenCalledOnce();
        expect(verify).toHaveBeenCalledWith(verifyTokenCommandFixture.token, SIGN_TOKEN_SECRET);
      });

      it('should throw an UnauthorizedException', () => {
        expect(result).toBeInstanceOf(UnauthorizedException);
      });
    });

    describe('when called', () => {
      let verifyTokenCommandFixture: VerifyTokenCommand;
      let authTokenPayloadFixture: AuthTokenPayload;
      let result: unknown;

      beforeAll(async () => {
        verifyTokenCommandFixture = VerifyTokenCommandFixtures.any;
        authTokenPayloadFixture = AuthTokenPayloadFixtures.any;

        (verify as unknown as Mock).mockReturnValueOnce(authTokenPayloadFixture);

        result = verifyTokenJwtAdapter.verify(verifyTokenCommandFixture);
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should return a AuthTokenPayload', () => {
        expect(result).toStrictEqual(authTokenPayloadFixture);
      });
    });
  });
});
