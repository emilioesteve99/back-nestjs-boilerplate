import { Module } from '@nestjs/common';

import { AppConfig } from '../app/AppConfig';

@Module({
  exports: [AppConfig],
  providers: [AppConfig],
})
export class AppConfigModule {}
