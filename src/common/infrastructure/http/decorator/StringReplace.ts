import { Transform, TransformFnParams } from 'class-transformer';

import { stringReplaceTransform } from '../transform/stringReplaceTransform';

export function StringReplace(pattern: string | RegExp, replacement: string): PropertyDecorator {
  return Transform((params: TransformFnParams) => stringReplaceTransform(params, pattern, replacement));
}
