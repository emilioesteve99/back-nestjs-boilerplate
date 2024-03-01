import { AppEnvVariables } from '../../../domain/model/AppEnvVariables';

export class AppEnvVariablesFixtures {
  public static get any(): AppEnvVariables {
    const appEnvVariables: AppEnvVariables = {
      NODE_PORT: 23456,
    };

    return appEnvVariables;
  }
}
