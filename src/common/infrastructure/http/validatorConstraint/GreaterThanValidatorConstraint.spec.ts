import { BadRequestException } from '@nestjs/common';
import { isDate, isNumber, isString, ValidationArguments } from 'class-validator';
import { Mock } from 'vitest';

import { GreaterThanValidatorConstraint } from './GreaterThanValidatorConstraint';
import { ValidationArgumentsFixtures } from '../../../fixtures/http/validation/GreaterThanOrEqualToValidationArgumentsFixtures';

vi.mock('class-validator', async () => {
  const classValidatorCommon: object = await vi.importActual('class-validator');
  const isDateMock: Mock = vi.fn();
  const isNumberMock: Mock = vi.fn();
  const isStringMock: Mock = vi.fn();

  return {
    ...classValidatorCommon,
    isDate: isDateMock,
    isNumber: isNumberMock,
    isString: isStringMock,
  };
});

describe(GreaterThanValidatorConstraint.name, () => {
  let greaterThanValidatorConstraint: GreaterThanValidatorConstraint;

  beforeAll(() => {
    greaterThanValidatorConstraint = new GreaterThanValidatorConstraint();
  });

  describe('.validate()', () => {
    describe('having a value to compare undefined', () => {
      describe('when called', () => {
        let propertyValueFixture: Date | number | string;
        let validationArgumentsFixture: ValidationArguments;
        let result: boolean;

        beforeAll(async () => {
          propertyValueFixture = 0;
          validationArgumentsFixture = ValidationArgumentsFixtures.withValueToCompareUndefined;

          result = greaterThanValidatorConstraint.validate(propertyValueFixture, validationArgumentsFixture);
        });

        afterAll(() => {
          vi.clearAllMocks();
        });

        it('should return true', () => {
          expect(result).toBe(true);
        });
      });
    });

    describe('having a value to compare not undefined and a property value that is not a Date, number or string', () => {
      describe('when called', () => {
        let propertyValueFixture: Date | number | string;
        let validationArgumentsFixture: ValidationArguments;
        let result: unknown;

        beforeAll(async () => {
          propertyValueFixture = {} as string;
          validationArgumentsFixture = ValidationArgumentsFixtures.withValueToCompare2;

          (isDate as unknown as Mock).mockReturnValueOnce(false);
          (isNumber as unknown as Mock).mockReturnValueOnce(false);
          (isString as unknown as Mock).mockReturnValueOnce(false);

          try {
            greaterThanValidatorConstraint.validate(propertyValueFixture, validationArgumentsFixture);
          } catch (error: unknown) {
            result = error;
          }
        });

        afterAll(() => {
          vi.clearAllMocks();
        });

        it('should throw a BadRequestException', () => {
          expect(result).toBeInstanceOf(BadRequestException);
          expect((result as BadRequestException).message).toBe(
            `${validationArgumentsFixture.property} must be a Date, number or string`,
          );
        });
      });
    });

    describe('having a value to compare not undefined and a property value that is not the same type that the value to compare', () => {
      describe('when called', () => {
        let propertyValueFixture: Date | number | string;
        let validationArgumentsFixture: ValidationArguments;
        let result: unknown;

        beforeAll(async () => {
          propertyValueFixture = '';
          validationArgumentsFixture = ValidationArgumentsFixtures.withValueToCompare2;

          (isDate as unknown as Mock).mockReturnValueOnce(true);
          (isNumber as unknown as Mock).mockReturnValueOnce(true);
          (isString as unknown as Mock).mockReturnValueOnce(true);

          try {
            greaterThanValidatorConstraint.validate(propertyValueFixture, validationArgumentsFixture);
          } catch (error: unknown) {
            result = error;
          }
        });

        afterAll(() => {
          vi.clearAllMocks();
        });

        it('should throw a BadRequestException', () => {
          expect(result).toBeInstanceOf(BadRequestException);
          expect((result as BadRequestException).message).toBe(
            `${validationArgumentsFixture.constraints[0]} and ${validationArgumentsFixture.property} must be of the same type`,
          );
        });
      });
    });

    describe('having a property value greater than value to compare', () => {
      describe('when called', () => {
        let propertyValueFixture: Date | number | string;
        let validationArgumentsFixture: ValidationArguments;
        let result: boolean;

        beforeAll(async () => {
          propertyValueFixture = 3;
          validationArgumentsFixture = ValidationArgumentsFixtures.withValueToCompare2;

          (isDate as unknown as Mock).mockReturnValueOnce(true);
          (isNumber as unknown as Mock).mockReturnValueOnce(true);
          (isString as unknown as Mock).mockReturnValueOnce(true);

          result = greaterThanValidatorConstraint.validate(propertyValueFixture, validationArgumentsFixture);
        });

        afterAll(() => {
          vi.clearAllMocks();
        });

        it('should return true', () => {
          expect(result).toBe(true);
        });
      });
    });

    describe('having a property value less or equal than value to compare', () => {
      describe('when called', () => {
        let propertyValueFixture: Date | number | string;
        let validationArgumentsFixture: ValidationArguments;
        let result: boolean;

        beforeAll(async () => {
          propertyValueFixture = 2;
          validationArgumentsFixture = ValidationArgumentsFixtures.withValueToCompare2;

          (isDate as unknown as Mock).mockReturnValueOnce(true);
          (isNumber as unknown as Mock).mockReturnValueOnce(true);
          (isString as unknown as Mock).mockReturnValueOnce(true);

          result = greaterThanValidatorConstraint.validate(propertyValueFixture, validationArgumentsFixture);
        });

        afterAll(() => {
          vi.clearAllMocks();
        });

        it('should return false', () => {
          expect(result).toBe(false);
        });
      });
    });
  });

  describe('.defaultMessage()', () => {
    describe('when called', () => {
      let validationArgumentsFixture: ValidationArguments;
      let result: string;

      beforeAll(async () => {
        validationArgumentsFixture = ValidationArgumentsFixtures.withValueToCompare2;

        result = greaterThanValidatorConstraint.defaultMessage(validationArgumentsFixture);
      });

      it('should return correct error message', () => {
        expect(result).toBe(
          `${validationArgumentsFixture.property} must be greater than: ${validationArgumentsFixture.constraints[0]}`,
        );
      });
    });
  });
});
