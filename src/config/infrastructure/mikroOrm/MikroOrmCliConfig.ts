import { ReflectMetadataProvider } from '@mikro-orm/decorators/legacy';
import { defineConfig } from '@mikro-orm/postgresql';

import { DatabaseConfig } from '../database/DatabaseConfig';

const databaseConfig: DatabaseConfig = new DatabaseConfig();

export default defineConfig({
  dbName: databaseConfig.database,
  entities: ['./dist/*/infrastructure/mikroOrm/model/!(AnyEntity)*.js'],
  entitiesTs: ['./src/*/infrastructure/mikroOrm/model/!(AnyEntity)*.ts'],
  host: databaseConfig.host,
  metadataProvider: ReflectMetadataProvider,
  migrations: {
    path: 'dist/common/infrastructure/mikroOrm/migrations',
    pathTs: 'src/common/infrastructure/mikroOrm/migrations',
  },
  password: databaseConfig.password,
  port: databaseConfig.port,
  user: databaseConfig.user,
});
