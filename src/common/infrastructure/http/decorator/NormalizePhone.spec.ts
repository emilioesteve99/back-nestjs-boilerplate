import { Transform } from 'class-transformer';
import { Mock } from 'vitest';

import { NormalizePhone } from './NormalizePhone';

vi.mock('class-transformer', async () => {
  const classTransformerCommon: object = await vi.importActual('class-transformer');

  return {
    ...classTransformerCommon,
    Transform: vi.fn(),
  };
});

describe(NormalizePhone.name, () => {
  let transformMockReturnFixture: PropertyDecorator;

  describe('when called', () => {
    beforeEach(async () => {
      transformMockReturnFixture = () => undefined;

      (Transform as unknown as Mock).mockReturnValueOnce(transformMockReturnFixture);

      NormalizePhone();
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it('should call `Transform`', () => {
      expect(Transform).toHaveBeenCalledOnce();
    });
  });
});
