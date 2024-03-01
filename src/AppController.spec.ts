import { AppController } from './AppController';

describe(AppController.name, () => {
  let appController: AppController;

  beforeAll(() => {
    appController = new AppController();
  });

  describe('.status()', () => {
    describe('when called', () => {
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
});
