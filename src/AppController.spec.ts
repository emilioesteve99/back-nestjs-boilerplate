import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import { AppController } from './AppController';

describe(AppController.name, () => {
  let appController: AppController;

  beforeAll(() => {
    appController = new AppController();
  });

  describe(AppController.prototype.status.name, () => {
    let result: string;

    beforeAll(() => {
      result = appController.status();
    });

    afterAll(() => {
      vi.clearAllMocks();
    });

    it('should return "ok"', () => {
      expect(result).toBe('ok');
    });
  });
});
