import { AppController } from './AppController';

describe(AppController.name, () => {
  let appController: AppController;

  beforeEach(() => {
    appController = new AppController();
  });

  describe('.status()', () => {
    describe('when called', () => {
      let result: string;

      beforeEach(() => {
        result = appController.status();
      });

      afterEach(() => {
        vi.clearAllMocks();
      });

      it('should return "ok"', () => {
        expect(result).toBe('ok');
      });
    });
  });
});
