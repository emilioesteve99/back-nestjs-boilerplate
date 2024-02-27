import { BadRequestException } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  isDate,
  isNumber,
  isString,
} from 'class-validator';

@ValidatorConstraint()
export class GreaterThanValidatorConstraint implements ValidatorConstraintInterface {
  public validate<T extends Date | number | string>(propertyValue: T, args: ValidationArguments): boolean {
    let validationResult: boolean = true;

    const valueToCompare: T | undefined = (args.object as any)[args.constraints[0]];

    if (valueToCompare !== undefined) {
      if (!(isDate(propertyValue) || isNumber(propertyValue) || isString(propertyValue))) {
        throw new BadRequestException(`${args.property} must be a Date, number or string`);
      }

      if (typeof propertyValue !== typeof valueToCompare) {
        throw new BadRequestException(`${args.constraints[0]} and ${args.property} must be of the same type`);
      }

      validationResult = propertyValue > valueToCompare;
    }

    return validationResult;
  }

  public defaultMessage(validationArguments: ValidationArguments): string {
    return `${validationArguments.property} must be greater than: ${validationArguments.constraints[0]}`;
  }
}
