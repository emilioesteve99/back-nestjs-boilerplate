import { Validate } from 'class-validator';
import { Mock } from 'vitest';

import { IsGreaterThan } from './IsGreaterThan';
import { GreaterThanValidatorConstraint } from '../validatorConstraint/GreaterThanValidatorConstraint';

vi.mock('class-validator', async () => {
  const classValidatorCommon: object = await vi.importActual('class-validator');

  return {
    ...classValidatorCommon,
    Validate: vi.fn(),
  };
});

describe(IsGreaterThan.name, () => {
  describe('when called', () => {
    let propertyDecoratorFixture: PropertyDecorator;
    let propertyKey: string;
    let result: unknown;

    beforeAll(async () => {
      propertyDecoratorFixture = () => {};

      propertyKey = 'valueToCompare';

      (Validate as unknown as Mock).mockReturnValueOnce(propertyDecoratorFixture);

      result = IsGreaterThan(propertyKey);
    });

    afterAll(() => {
      vi.clearAllMocks();
    });

    it('should call `Validate` once with GreaterThanValidatorConstraint', () => {
      expect(Validate).toHaveBeenCalledOnce();
      expect(Validate).toHaveBeenCalledWith(GreaterThanValidatorConstraint, [propertyKey]);
    });

    it('should return a PropertyDecorator', () => {
      expect(result).toBe(propertyDecoratorFixture);
    });
  });
});
