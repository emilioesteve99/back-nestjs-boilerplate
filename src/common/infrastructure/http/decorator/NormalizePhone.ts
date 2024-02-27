import { Transform, TransformFnParams } from 'class-transformer';

import { normalizePhoneTransform } from './normalizePhoneTransform';

export function NormalizePhone(): PropertyDecorator {
  return Transform((params: TransformFnParams): string => normalizePhoneTransform(params));
}
