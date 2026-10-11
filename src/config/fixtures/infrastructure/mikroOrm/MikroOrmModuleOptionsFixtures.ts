import { ReflectMetadataProvider } from '@mikro-orm/decorators/legacy';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

import { DatabaseConfigFixtures } from '../database/DatabaseConfigFixtures';

export class MikroOrmModuleOptionsFixtures {
  public static get any(): MikroOrmModuleOptions {
    const mikroOrmModuleOptions: MikroOrmModuleOptions = {
      allowGlobalContext: false,
      autoLoadEntities: true,
      dbName: DatabaseConfigFixtures.any.database,
      driver: PostgreSqlDriver,
      forceUndefined: true,
      host: DatabaseConfigFixtures.any.host,
      metadataProvider: ReflectMetadataProvider,
      migrations: {
        path: 'dist/common/infrastructure/mikroOrm/migrations',
        pathTs: 'src/common/infrastructure/mikroOrm/migrations',
      },
      password: DatabaseConfigFixtures.any.password,
      port: DatabaseConfigFixtures.any.port,
      user: DatabaseConfigFixtures.any.user,
    };

    return mikroOrmModuleOptions;
  }
}
