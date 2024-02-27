import { Module } from '@nestjs/common';

import { LoadAppEnvVariablesDotenvAdapter } from '../adapter/LoadAppEnvVariablesDotenvAdapter';

@Module({
  exports: [LoadAppEnvVariablesDotenvAdapter],
  providers: [LoadAppEnvVariablesDotenvAdapter],
})
export class AppEnvVariableModule {}
