import { ReflectMetadataProvider } from '@mikro-orm/decorators/legacy';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

import { DatabaseConfig } from './DatabaseConfig';

export function getMikroOrmModuleOptions(databaseConfig: DatabaseConfig): MikroOrmModuleOptions {
  const mikroOrmModuleOptions: MikroOrmModuleOptions = {
    allowGlobalContext: false,
    autoLoadEntities: true,
    dbName: databaseConfig.database,
    driver: PostgreSqlDriver,
    forceUndefined: true,
    host: databaseConfig.host,
    metadataProvider: ReflectMetadataProvider,
    migrations: {
      path: 'dist/common/infrastructure/mikroOrm/migrations',
      pathTs: 'src/common/infrastructure/mikroOrm/migrations',
    },
    password: databaseConfig.password,
    port: databaseConfig.port,
    user: databaseConfig.user,
  };

  return mikroOrmModuleOptions;
}
