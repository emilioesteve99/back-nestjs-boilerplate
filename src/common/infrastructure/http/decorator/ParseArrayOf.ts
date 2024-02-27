import { Type } from '@nestjs/common';
import { Transform, TransformFnParams } from 'class-transformer';

import { parseArrayOfTransform } from '../transform/parseArrayOfTransform';

export function ParseArrayOf<T>(type: Type<T>): PropertyDecorator {
  return Transform((params: TransformFnParams) => parseArrayOfTransform(type, params));
}
