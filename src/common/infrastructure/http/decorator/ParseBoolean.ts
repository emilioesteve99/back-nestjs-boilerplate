import { Transform, TransformFnParams } from 'class-transformer';

import { parseBooleanTransform } from '../transform/parseBooleanTransform';

export function ParseBoolean(): PropertyDecorator {
  return Transform((params: TransformFnParams) => parseBooleanTransform(params));
}
