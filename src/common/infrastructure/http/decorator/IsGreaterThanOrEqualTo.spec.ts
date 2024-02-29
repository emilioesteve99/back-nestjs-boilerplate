import { Validate } from 'class-validator';
import { Mock } from 'vitest';

import { IsGreaterThanOrEqualTo } from './IsGreaterThanOrEqualTo';
import { GreaterThanOrEqualToValidatorConstraint } from '../validatorConstraint/GreaterThanOrEqualToValidatorConstraint';

vi.mock('class-validator', async () => {
  const classValidatorCommon: object = await vi.importActual('class-validator');

  return {
    ...classValidatorCommon,
    Validate: vi.fn(),
  };
});

describe(IsGreaterThanOrEqualTo.name, () => {
  describe('when called', () => {
    let propertyDecoratorFixture: PropertyDecorator;
    let propertyKey: string;
    let result: unknown;

    beforeAll(async () => {
      propertyDecoratorFixture = () => {};

      propertyKey = 'numberToCompare';

      (Validate as unknown as Mock).mockReturnValueOnce(propertyDecoratorFixture);

      result = IsGreaterThanOrEqualTo(propertyKey);
    });

    afterAll(() => {
      vi.clearAllMocks();
    });

    it('should call `Validate` once with GreaterThanOrEqualToValidatorConstraint', () => {
      expect(Validate).toHaveBeenCalledOnce();
      expect(Validate).toHaveBeenCalledWith(GreaterThanOrEqualToValidatorConstraint, [propertyKey]);
    });

    it('should return a PropertyDecorator', () => {
      expect(result).toBe(propertyDecoratorFixture);
    });
  });
});
