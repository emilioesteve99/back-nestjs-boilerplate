import { Transform } from 'class-transformer';
import { Mock } from 'vitest';

import { ParseBoolean } from './ParseBoolean';

vi.mock('class-transformer', async () => {
  const classTransformerCommon: object = await vi.importActual('class-transformer');

  return {
    ...classTransformerCommon,
    Transform: vi.fn(),
  };
});

describe(ParseBoolean.name, () => {
  let transformMockReturnFixture: PropertyDecorator;

  describe('when called', () => {
    beforeEach(async () => {
      transformMockReturnFixture = () => undefined;

      (Transform as unknown as Mock).mockReturnValueOnce(transformMockReturnFixture);

      ParseBoolean();
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it('should call `Transform`', () => {
      expect(Transform).toHaveBeenCalledOnce();
    });
  });
});
