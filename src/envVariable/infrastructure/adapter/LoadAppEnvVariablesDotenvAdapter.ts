import { Injectable } from '@nestjs/common';

import { LoadDataDotenvAdapter } from '../../../env/infrastructure/dotenv/adapter/LoadDotenvAdapter';
import { AppEnvVariables } from '../../domain/model/AppEnvVariables';
import { appEnvVariablesToEnvVariablesValidatorEnvalidMap } from '../envalid/model/appEnvVariablesToEnvVariablesValidatorEnvalidMap';

@Injectable()
export class LoadAppEnvVariablesDotenvAdapter extends LoadDataDotenvAdapter<AppEnvVariables> {
  public constructor() {
    super(appEnvVariablesToEnvVariablesValidatorEnvalidMap);
  }
}
