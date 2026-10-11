import { AppConfig } from './AppConfig';

describe(AppConfig.name, () => {
  describe('when instantiated', () => {
    let portFixture: number;
    let appConfig: AppConfig;

    beforeEach(() => {
      portFixture = 3000;

      vi.stubEnv('NODE_PORT', portFixture.toString());
      appConfig = new AppConfig();
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it('should have all its properties set', () => {
      expect(appConfig.port).toStrictEqual(portFixture);
    });
  });
});
