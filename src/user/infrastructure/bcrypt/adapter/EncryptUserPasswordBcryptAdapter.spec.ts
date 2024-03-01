vi.mock('bcrypt', async () => ({
  ...(await vi.importActual('bcrypt')),
  hash: vi.fn(),
}));

import * as bcrypt from 'bcrypt';
import { expect, Mock } from 'vitest';

import { EncryptUserPasswordBcryptAdapter } from './EncryptUserPasswordBcryptAdapter';
import { UserInsertOneCommand } from '../../../domain/command/UserInsertOneCommand';
import { UserInsertOneCommandFixtures } from '../../../fixtures/domain/command/UserInsertOneCommandFixtures';

describe(EncryptUserPasswordBcryptAdapter.name, () => {
  let encryptUserPasswordBcryptAdapter: EncryptUserPasswordBcryptAdapter;

  beforeAll(() => {
    encryptUserPasswordBcryptAdapter = new EncryptUserPasswordBcryptAdapter();
  });

  describe('.encrypt()', () => {
    describe('when called', () => {
      let userInsertOneCommandFixture: UserInsertOneCommand;
      let hashedPasswordFixture: string;
      let result: unknown;

      beforeAll(async () => {
        userInsertOneCommandFixture = UserInsertOneCommandFixtures.any;
        hashedPasswordFixture = 'hashed-password-example';

        (bcrypt.hash as unknown as Mock).mockResolvedValueOnce(hashedPasswordFixture);

        result = await encryptUserPasswordBcryptAdapter.encrypt(userInsertOneCommandFixture);
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call bcrypt.hash()', () => {
        expect(bcrypt.hash).toHaveBeenCalledOnce();
        expect(bcrypt.hash).toHaveBeenCalledWith(userInsertOneCommandFixture.password, 9);
      });

      it('should return a string', () => {
        expect(result).toBe(hashedPasswordFixture);
      });
    });
  });
});
