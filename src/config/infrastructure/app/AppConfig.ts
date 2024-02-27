import { Inject, Injectable } from '@nestjs/common';

import { LoadDataAdapter } from '../../../env/domain/adapter/LoadDataAdapter';
import { AppEnvVariables } from '../../../envVariable/domain/model/AppEnvVariables';
import { LoadAppEnvVariablesDotenvAdapter } from '../../../envVariable/infrastructure/adapter/LoadAppEnvVariablesDotenvAdapter';

@Injectable()
export class AppConfig {
  public readonly port: number;

  public constructor(
    @Inject(LoadAppEnvVariablesDotenvAdapter) loadAppEnvVariablesDotenvAdapter: LoadDataAdapter<AppEnvVariables>,
  ) {
    const appEnvVariables: AppEnvVariables = loadAppEnvVariablesDotenvAdapter.loadData();

    this.port = appEnvVariables.NODE_PORT;
  }
}
