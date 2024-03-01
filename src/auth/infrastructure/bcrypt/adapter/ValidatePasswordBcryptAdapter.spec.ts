import * as bcrypt from 'bcrypt';
import { expect, Mock } from 'vitest';

import { ValidatePasswordBcryptAdapter } from './ValidatePasswordBcryptAdapter';
import { ValidatePasswordCommand } from '../../../domain/command/ValidatePasswordCommand';
import { ValidatePasswordCommandFixtures } from '../../../fixtures/domain/command/ValidatePasswordCommandFixtures';

vi.mock('bcrypt', async () => ({
  ...(await vi.importActual('bcrypt')),
  compare: vi.fn(),
}));

describe(ValidatePasswordBcryptAdapter.name, () => {
  let validatePasswordBcryptAdapter: ValidatePasswordBcryptAdapter;

  beforeAll(() => {
    validatePasswordBcryptAdapter = new ValidatePasswordBcryptAdapter();
  });

  describe('.validate()', () => {
    describe('when called', () => {
      let validatePasswordCommandFixture: ValidatePasswordCommand;
      let compareResult: boolean;
      let result: unknown;

      beforeAll(async () => {
        validatePasswordCommandFixture = ValidatePasswordCommandFixtures.any;
        compareResult = true;

        (bcrypt.compare as unknown as Mock).mockResolvedValueOnce(compareResult);

        result = await validatePasswordBcryptAdapter.validate(validatePasswordCommandFixture);
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call bcrypt.compare()', () => {
        expect(bcrypt.compare).toHaveBeenCalledOnce();
        expect(bcrypt.compare).toHaveBeenCalledWith(
          validatePasswordCommandFixture.passwordToTry,
          validatePasswordCommandFixture.actualPassword,
        );
      });

      it('should return a boolean', () => {
        expect(result).toBe(compareResult);
      });
    });
  });
});
