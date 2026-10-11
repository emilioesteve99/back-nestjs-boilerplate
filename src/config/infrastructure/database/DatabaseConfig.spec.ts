import { DatabaseConfig } from './DatabaseConfig';

describe(DatabaseConfig.name, () => {
  describe('when instantiated', () => {
    let databaseFixture: string;
    let hostFixture: string;
    let passwordFixture: string;
    let portFixture: number;
    let userFixture: string;
    let databaseConfig: DatabaseConfig;

    beforeEach(() => {
      databaseFixture = 'test_database';
      hostFixture = 'test_host';
      passwordFixture = 'test_password';
      portFixture = 1234;
      userFixture = 'test_user';

      vi.stubEnv('DB_DATABASE', databaseFixture);
      vi.stubEnv('DB_HOST', hostFixture);
      vi.stubEnv('DB_PASSWORD', passwordFixture);
      vi.stubEnv('DB_PORT', portFixture.toString());
      vi.stubEnv('DB_USER', userFixture);

      databaseFixture = process.env.DB_DATABASE as string;
      hostFixture = process.env.DB_HOST as string;
      passwordFixture = process.env.DB_PASSWORD as string;
      portFixture = parseInt(process.env.DB_PORT ?? '5432', 10);
      userFixture = process.env.DB_USER as string;

      databaseConfig = new DatabaseConfig();
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it('should have all its properties set', () => {
      expect(databaseConfig.database).toStrictEqual(databaseFixture);
      expect(databaseConfig.host).toStrictEqual(hostFixture);
      expect(databaseConfig.password).toStrictEqual(passwordFixture);
      expect(databaseConfig.port).toStrictEqual(portFixture);
      expect(databaseConfig.user).toStrictEqual(userFixture);
    });
  });
});
