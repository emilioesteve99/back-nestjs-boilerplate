import { ValidateIf } from 'class-validator';

export const IsOptionalNotNullValidateIfCondition: (object: any, value: any) => boolean = (_object: any, value: any) =>
  value !== undefined;

export function IsOptionalNotNull(): PropertyDecorator {
  return ValidateIf(IsOptionalNotNullValidateIfCondition);
}
