import { Injectable } from '@nestjs/common';

import { LoadDataDotenvAdapter } from '../../../env/infrastructure/dotenv/adapter/LoadDataDotenvAdapter';
import { AppEnvVariables } from '../../domain/model/AppEnvVariables';
import { appEnvVariablesToEnvVariablesValidatorEnvalidMap } from '../envalid/model/appEnvVariablesToEnvVariablesValidatorEnvalidMap';

@Injectable()
export class LoadAppEnvVariablesDotenvAdapter extends LoadDataDotenvAdapter<AppEnvVariables> {
  public constructor() {
    super(appEnvVariablesToEnvVariablesValidatorEnvalidMap);
  }
}
