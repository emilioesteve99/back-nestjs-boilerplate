import { Mocked } from 'vitest';

import { ValidatePasswordManager } from './ValidatePasswordManager';
import { ValidatePasswordCommand } from '../../domain/command/ValidatePasswordCommand';
import { ValidatePasswordCommandFixtures } from '../../fixtures/domain/command/ValidatePasswordCommandFixtures';
import { ValidatePasswordBcryptAdapter } from '../../infrastructure/bcrypt/adapter/ValidatePasswordBcryptAdapter';

describe(ValidatePasswordManager.name, () => {
  let validatePasswordAdapterMock: Mocked<ValidatePasswordBcryptAdapter>;

  let validatePasswordManager: ValidatePasswordManager;

  beforeAll(() => {
    validatePasswordAdapterMock = {
      validate: vi.fn(),
    };

    validatePasswordManager = new ValidatePasswordManager(validatePasswordAdapterMock);
  });

  describe('.manage()', () => {
    describe('when called', () => {
      let validatePasswordCommandFixture: ValidatePasswordCommand;
      let validationResult: boolean;
      let result: unknown;

      beforeAll(async () => {
        validatePasswordCommandFixture = ValidatePasswordCommandFixtures.any;
        validationResult = true;

        validatePasswordAdapterMock.validate.mockResolvedValue(validationResult);

        result = await validatePasswordManager.manage(validatePasswordCommandFixture);
      });

      it('should call validatePasswordAdapter.validate()', () => {
        expect(validatePasswordAdapterMock.validate).toHaveBeenCalledOnce();
        expect(validatePasswordAdapterMock.validate).toHaveBeenCalledWith(validatePasswordCommandFixture);
      });

      it('should return a boolean', () => {
        expect(result).toBe(validationResult);
      });
    });
  });
});
