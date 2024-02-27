import { Module } from '@nestjs/common';

import { AppEnvVariableModule } from '../../../envVariable/infrastructure/injection/AppEnvVariableModule';
import { AppConfig } from '../app/AppConfig';

@Module({
  exports: [AppConfig],
  imports: [AppEnvVariableModule],
  providers: [AppConfig],
})
export class AppConfigModule {}
