import path from 'path';

import { Injectable } from '@nestjs/common';
import dotenv from 'dotenv';
import { CleanedEnv, cleanEnv, CleanOptions } from 'envalid';

import { LoadDataAdapter } from '../../../domain/adapter/LoadDataAdapter';
import { EnvToEnvValidatorEnvalidMap } from '../../envalid/model/EnvToEnvValidatorEnvalidMap';

@Injectable()
export class LoadDataDotenvAdapter<TData> implements LoadDataAdapter<TData> {
  public constructor(private readonly envToEnvValidatorEnvalidMap: EnvToEnvValidatorEnvalidMap<TData>) {}

  public loadData(): TData {
    this.populateProcessEnv();

    const cleanEnv: TData = this.getCleanedEnv();

    return cleanEnv;
  }

  private populateProcessEnv(): void {
    const dotenvOptions: dotenv.DotenvConfigOptions = {
      path: this.getEnvFilepath(),
    };

    dotenv.config(dotenvOptions);
  }

  private getEnvFilepath(): string {
    const envFilepath: string = path.join(process.cwd(), '.env');

    return envFilepath;
  }

  private getCleanedEnv(): TData {
    const envalidOptions: CleanOptions<EnvToEnvValidatorEnvalidMap<TData>> = {};

    const cleanedEnv: CleanedEnv<EnvToEnvValidatorEnvalidMap<TData>> = cleanEnv(
      process.env,
      this.envToEnvValidatorEnvalidMap,
      envalidOptions,
    );

    const cleanedEnvProxy: TData = { ...cleanedEnv } as TData;

    return cleanedEnvProxy;
  }
}
