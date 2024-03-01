import { Mocked } from 'vitest';

import { AppConfig } from './AppConfig';
import { LoadDataAdapter } from '../../../env/domain/adapter/LoadDataAdapter';
import { AppEnvVariables } from '../../../envVariable/domain/model/AppEnvVariables';
import { AppEnvVariablesFixtures } from '../../../envVariable/fixtures/domain/model/AppEnvVariablesFixtures';

describe(AppConfig.name, () => {
  describe('when instantiated', () => {
    let appEnvVariablesFixture: AppEnvVariables;
    let loadAppEnvVariablesAdapter: Mocked<LoadDataAdapter<AppEnvVariables>>;
    let appConfig: AppConfig;

    beforeAll(() => {
      appEnvVariablesFixture = AppEnvVariablesFixtures.any;
      loadAppEnvVariablesAdapter = {
        loadData: vi.fn(),
      };

      loadAppEnvVariablesAdapter.loadData.mockReturnValueOnce(appEnvVariablesFixture);

      appConfig = new AppConfig(loadAppEnvVariablesAdapter);
    });

    afterAll(() => {
      vi.clearAllMocks();
    });

    it('should have all its properties set', () => {
      expect(appConfig.port).toStrictEqual(appEnvVariablesFixture.NODE_PORT);
    });
  });
});
