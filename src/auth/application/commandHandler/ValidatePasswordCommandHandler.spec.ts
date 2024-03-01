import { Mocked } from 'vitest';

import { ValidatePasswordCommandHandler } from './ValidatePasswordCommandHandler';
import { ManagerAsync } from '../../../common/domain/manager/ManagerAsync';
import { ValidatePasswordCommand } from '../../domain/command/ValidatePasswordCommand';
import { ValidatePasswordCommandFixtures } from '../../fixtures/domain/command/ValidatePasswordCommandFixtures';

describe(ValidatePasswordCommandHandler.name, () => {
  let validatePasswordManagerMock: Mocked<ManagerAsync<ValidatePasswordCommand, boolean>>;

  let validatePasswordCommandHandler: ValidatePasswordCommandHandler;

  beforeAll(() => {
    validatePasswordManagerMock = {
      manage: vi.fn(),
    };

    validatePasswordCommandHandler = new ValidatePasswordCommandHandler(validatePasswordManagerMock);
  });

  describe('.handle()', () => {
    describe('when called', () => {
      let validatePasswordCommandFixture: ValidatePasswordCommand;
      let validationResult: boolean;
      let result: unknown;

      beforeAll(async () => {
        validatePasswordCommandFixture = ValidatePasswordCommandFixtures.any;
        validationResult = true;

        validatePasswordManagerMock.manage.mockResolvedValue(validationResult);

        result = await validatePasswordCommandHandler.execute(validatePasswordCommandFixture);
      });

      it('should call validatePasswordManager.manage()', () => {
        expect(validatePasswordManagerMock.manage).toHaveBeenCalledOnce();
        expect(validatePasswordManagerMock.manage).toHaveBeenCalledWith(validatePasswordCommandFixture);
      });

      it('should return a boolean', () => {
        expect(result).toBe(validationResult);
      });
    });
  });
});
