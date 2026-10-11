import { Validate } from 'class-validator';
import { Mock } from 'vitest';
import { GreaterThanOrEqualToValidatorConstraint } from '../validatorConstraint/GreaterThanOrEqualToValidatorConstraint';
import { IsGreaterThanOrEqualTo } from './IsGreaterThanOrEqualTo';

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

    beforeEach(async () => {
      propertyDecoratorFixture = () => {};

      propertyKey = 'numberToCompare';

      (Validate as unknown as Mock).mockReturnValueOnce(propertyDecoratorFixture);

      result = IsGreaterThanOrEqualTo(propertyKey);
    });

    afterEach(() => {
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
