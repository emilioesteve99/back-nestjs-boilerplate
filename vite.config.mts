import { defineConfig } from 'vitest/config';

const config = defineConfig({
  test: {
    globals: true,
    dir: 'src',
    include: ['**/*.spec.ts'],
    disableConsoleIntercept: true,
    coverage: {
      cleanOnRerun: true,
      enabled: false,
      exclude: [
        '**/fixtures/**',
        '**/model/**',
        '**/query/**',
        '**/command/**',
        '**/domain/adapter/**',
        '**/injection/**',
        '**/AppModule.ts',
        '**/main.ts',
        '**/migrations/**',
        '**/MikroOrmCliConfig.ts',
      ],
      provider: 'istanbul',
      include: ['**/src/**'],
      reportsDirectory: 'coverage',
      // TODO: Change thresholds to 90% when we have more tests
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
  },
});

export default config;
