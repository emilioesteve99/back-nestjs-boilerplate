import { Module } from '@nestjs/common';

import { DatabaseConfig } from '../database/DatabaseConfig';

@Module({
  exports: [DatabaseConfig],
  providers: [DatabaseConfig],
})
export class DatabaseConfigModule {}
