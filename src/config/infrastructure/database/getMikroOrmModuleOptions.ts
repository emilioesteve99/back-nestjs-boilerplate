import { ConnectionOptions } from '@mikro-orm/core/utils/Configuration';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';

import { DatabaseConfig } from './DatabaseConfig';

export function getMikroOrmModuleOptions(databaseConfig: DatabaseConfig): MikroOrmModuleOptions {
  const mikroOrmModuleOptions: MikroOrmModuleOptions = {
    allowGlobalContext: false,
    autoLoadEntities: true,
    dbName: databaseConfig.database,
    forceUndefined: true,
    host: databaseConfig.host,
    migrations: {
      path: 'dist/common/infrastructure/mikroOrm/migrations',
      pathTs: 'src/common/infrastructure/mikroOrm/migrations',
    },
    password: databaseConfig.password,
    port: databaseConfig.port,
    preferReadReplicas: true,
    replicas: [].map(
      (host: string): Partial<ConnectionOptions> => ({
        host,
      }),
    ),
    type: 'postgresql',
    user: databaseConfig.user,
  };

  return mikroOrmModuleOptions;
}
