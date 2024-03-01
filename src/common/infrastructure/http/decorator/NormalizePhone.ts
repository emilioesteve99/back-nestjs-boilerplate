import { Transform, TransformFnParams } from 'class-transformer';

import { normalizePhoneTransform } from '../transform/normalizePhoneTransform';

export function NormalizePhone(): PropertyDecorator {
  return Transform((params: TransformFnParams): string => normalizePhoneTransform(params));
}
