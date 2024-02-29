import { defineConfig } from 'vitest/config';

const config = defineConfig({
  test: {
    dir: 'src',
    include: ['**/*.spec.ts'],
    disableConsoleIntercept: true,
    coverage: {
      enabled: false,
      provider: 'v8',
      include: ['**/src/**'],
      exclude: ['**/fixtures/**', '**/model/**', '**/injection/**', '**/AppModule.ts', '**/main.ts'],
      reportsDirectory: 'coverage',
      // TODO: Change thresholds to 90% when we have more tests
      thresholds: {
        branches: 0,
        functions: 0,
        lines: 0,
        statements: 0,
      },
    },
  },
});

export default config;
