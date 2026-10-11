import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { DatabaseConfigFixtures } from '../../fixtures/infrastructure/database/DatabaseConfigFixtures';
import { MikroOrmModuleOptionsFixtures } from '../../fixtures/infrastructure/mikroOrm/MikroOrmModuleOptionsFixtures';
import { DatabaseConfig } from './DatabaseConfig';
import { getMikroOrmModuleOptions } from './getMikroOrmModuleOptions';

describe(getMikroOrmModuleOptions.name, () => {
  let mikroOrmConfig: DatabaseConfig;

  beforeEach(() => {
    mikroOrmConfig = DatabaseConfigFixtures.any;
  });

  describe('when called', () => {
    let result: MikroOrmModuleOptions;
    let mikroOrmModuleOptionsFixture: MikroOrmModuleOptions;

    beforeEach(() => {
      mikroOrmModuleOptionsFixture = MikroOrmModuleOptionsFixtures.any;

      result = getMikroOrmModuleOptions(mikroOrmConfig);
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it('should return the correct config', () => {
      expect(result).toMatchObject(mikroOrmModuleOptionsFixture);
    });
  });
});
