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
    type: 'postgresql',
    user: databaseConfig.user,
  };

  return mikroOrmModuleOptions;
}
