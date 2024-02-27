import { Validate } from 'class-validator';

import { GreaterThanOrEqualToValidatorConstraint } from '../validatorConstraint/GreaterThanOrEqualToValidatorConstraint';

export function IsGreaterThanOrEqualTo(propertyKey: string): PropertyDecorator {
  return Validate(GreaterThanOrEqualToValidatorConstraint, [propertyKey]);
}
