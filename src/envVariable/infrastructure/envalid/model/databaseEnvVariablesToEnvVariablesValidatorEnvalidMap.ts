import { host, port, str } from 'envalid';

import { EnvToEnvValidatorEnvalidMap } from '../../../../env/infrastructure/envalid/model/EnvToEnvValidatorEnvalidMap';
import { DatabaseEnvVariables } from '../../../domain/model/DatabaseEnvVariables';

export const databaseEnvVariablesToEnvVariablesValidatorEnvalidMap: EnvToEnvValidatorEnvalidMap<DatabaseEnvVariables> =
  {
    DB_DATABASE: str(),
    DB_HOST: host(),
    DB_PASSWORD: str(),
    DB_PORT: port(),
    DB_USER: str(),
  };
