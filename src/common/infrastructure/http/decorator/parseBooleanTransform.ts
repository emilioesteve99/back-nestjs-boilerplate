import { BadRequestException } from '@nestjs/common';
import { TransformFnParams } from 'class-transformer';

export function parseBooleanTransform(params: TransformFnParams): boolean {
  let boolean: boolean;

  try {
    boolean = Boolean(JSON.parse(params.obj[params.key]));
  } catch (error) {
    throw new BadRequestException(`${params.key} property must be a valid boolean`);
  }

  return boolean;
}
