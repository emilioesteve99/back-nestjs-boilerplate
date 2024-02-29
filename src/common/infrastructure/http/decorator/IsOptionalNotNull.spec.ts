import { ValidateIf } from 'class-validator';
import { Mock } from 'vitest';

import { IsOptionalNotNull, IsOptionalNotNullValidateIfCondition } from './IsOptionalNotNull';

vi.mock('class-validator', async () => {
  const classValidatorCommon: object = await vi.importActual('class-validator');

  return {
    ...classValidatorCommon,
    ValidateIf: vi.fn(),
  };
});

describe(IsOptionalNotNullValidateIfCondition.name, () => {
  let valueFixture: unknown;
  let result: unknown;

  describe('having a undefined value', () => {
    describe('when called', () => {
      beforeAll(async () => {
        valueFixture = undefined;

        result = IsOptionalNotNullValidateIfCondition(undefined, valueFixture);
      });

      it('should return false', () => {
        expect(result).toBe(false);
      });
    });
  });

  describe('having a not undefined value', () => {
    describe('when called', () => {
      beforeAll(async () => {
        valueFixture = '';

        result = IsOptionalNotNullValidateIfCondition(undefined, valueFixture);
      });

      it('should return true', () => {
        expect(result).toBe(true);
      });
    });
  });
});

describe(IsOptionalNotNull.name, () => {
  let validateIfMockReturnFixture: PropertyDecorator;

  describe('when called', () => {
    beforeAll(async () => {
      validateIfMockReturnFixture = () => undefined;

      (ValidateIf as unknown as Mock).mockReturnValueOnce(validateIfMockReturnFixture);

      IsOptionalNotNull();
    });

    afterAll(() => {
      vi.clearAllMocks();
    });

    it('should call `ValidateIf`', () => {
      expect(ValidateIf).toHaveBeenCalledOnce();
      expect(ValidateIf).toHaveBeenCalledWith(IsOptionalNotNullValidateIfCondition);
    });
  });
});
