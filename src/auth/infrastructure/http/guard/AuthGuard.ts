import { applyDecorators, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from './JwtAuthGuard';

export function AuthGuard() {
  return applyDecorators(UseGuards(JwtAuthGuard));
}
