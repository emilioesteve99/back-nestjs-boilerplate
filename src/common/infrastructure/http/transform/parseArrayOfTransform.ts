import { BadRequestException, Type } from '@nestjs/common';
import { plainToInstance, TransformFnParams } from 'class-transformer';

export function parseArrayOfTransform<T>(type: Type<T>, params: TransformFnParams): T[] {
  let array: unknown[];
  try {
    array = JSON.parse(params.value);
  } catch (error) {
    throw new BadRequestException(`${params.key} property must be a valid JSON`);
  }

  if (!Array.isArray(array)) {
    throw new BadRequestException(`${params.key} property must be a valid array`);
  }

  const parsedArray: T[] = array.map((element: unknown) => plainToInstance(type, element));

  return parsedArray;
}
