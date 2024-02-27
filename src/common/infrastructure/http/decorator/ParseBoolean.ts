import { Transform, TransformFnParams } from 'class-transformer';

import { parseBooleanTransform } from './parseBooleanTransform';

export function ParseBoolean(): PropertyDecorator {
  return Transform((params: TransformFnParams) => parseBooleanTransform(params));
}
