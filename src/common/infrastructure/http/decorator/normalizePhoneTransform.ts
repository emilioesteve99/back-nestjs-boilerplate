import { BadRequestException } from '@nestjs/common';
import { TransformFnParams } from 'class-transformer';

export function normalizePhoneTransform(params: TransformFnParams): string {
  let phone: string;

  try {
    phone = params.obj[params.key]!.replace(/[^+0-9]/g, '');
  } catch (_: unknown) {
    throw new BadRequestException(`${params.key} property must be a valid phone`);
  }

  return phone;
}
