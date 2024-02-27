import { BadRequestException } from '@nestjs/common';
import { TransformFnParams } from 'class-transformer';

export function stringReplaceTransform(
  params: TransformFnParams,
  pattern: string | RegExp,
  replacement: string,
): string {
  const value: unknown = params.value;

  if (typeof value !== 'string') {
    throw new BadRequestException(`${params.key} property must be a string`);
  }

  const replacedString: string = value.replace(pattern, replacement);

  return replacedString;
}
