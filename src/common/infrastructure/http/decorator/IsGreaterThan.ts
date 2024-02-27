import { Validate } from 'class-validator';

import { GreaterThanValidatorConstraint } from '../validatorConstraint/GreaterThanValidatorConstraint';

export function IsGreaterThan(propertyKey: string): PropertyDecorator {
  return Validate(GreaterThanValidatorConstraint, [propertyKey]);
}
