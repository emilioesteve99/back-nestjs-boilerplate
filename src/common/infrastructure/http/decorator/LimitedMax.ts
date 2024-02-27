import { Transform, TransformFnParams } from 'class-transformer';

export function replaceMaxValue(params: TransformFnParams, value: number): number {
  let output: number = params.value;

  if (output > value) {
    output = value;
  }

  return output;
}

export function LimitedMax(value: number): PropertyDecorator {
  return Transform((params: TransformFnParams): number => replaceMaxValue(params, value));
}
