import { Mocked } from 'vitest';

import { SignAuthTokenCommandHandler } from './SignAuthTokenCommandHandler';
import { ManagerAsync } from '../../../common/domain/manager/ManagerAsync';
import { SignAuthTokenCommand } from '../../domain/command/SignAuthTokenCommand';
import { SignAuthTokenCommandFixtures } from '../../fixtures/domain/command/SignAuthTokenCommandFixtures';

describe(SignAuthTokenCommandHandler.name, () => {
  let signAuthTokenManagerMock: Mocked<ManagerAsync<SignAuthTokenCommand, string>>;

  let signAuthTokenCommandHandler: SignAuthTokenCommandHandler;

  beforeAll(() => {
    signAuthTokenManagerMock = {
      manage: vi.fn(),
    };

    signAuthTokenCommandHandler = new SignAuthTokenCommandHandler(signAuthTokenManagerMock);
  });

  describe('.handle()', () => {
    describe('when called', () => {
      let signAuthTokenCommandFixture: SignAuthTokenCommand;
      let tokenFixture: string;
      let result: unknown;

      beforeAll(async () => {
        signAuthTokenCommandFixture = SignAuthTokenCommandFixtures.any;
        tokenFixture = 'token-example';

        signAuthTokenManagerMock.manage.mockResolvedValue(tokenFixture);

        result = await signAuthTokenCommandHandler.execute(signAuthTokenCommandFixture);
      });

      it('should call signAuthTokenManager.manage()', () => {
        expect(signAuthTokenManagerMock.manage).toHaveBeenCalledOnce();
        expect(signAuthTokenManagerMock.manage).toHaveBeenCalledWith(signAuthTokenCommandFixture);
      });

      it('should return a string', () => {
        expect(result).toBe(tokenFixture);
      });
    });
  });
});
