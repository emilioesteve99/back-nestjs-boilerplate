import { port } from 'envalid';

import { EnvToEnvValidatorEnvalidMap } from '../../../../env/infrastructure/envalid/model/EnvToEnvValidatorEnvalidMap';
import { AppEnvVariables } from '../../../domain/model/AppEnvVariables';

export const appEnvVariablesToEnvVariablesValidatorEnvalidMap: EnvToEnvValidatorEnvalidMap<AppEnvVariables> = {
  NODE_PORT: port(),
};
