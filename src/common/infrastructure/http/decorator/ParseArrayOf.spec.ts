import { Transform } from 'class-transformer';
import { Mock } from 'vitest';

import { ParseArrayOf } from './ParseArrayOf';

vi.mock('class-transformer', async () => {
  const classTransformerCommon: object = await vi.importActual('class-transformer');

  return {
    ...classTransformerCommon,
    Transform: vi.fn(),
  };
});

describe(ParseArrayOf.name, () => {
  let transformMockReturnFixture: PropertyDecorator;

  describe('when called', () => {
    beforeAll(async () => {
      transformMockReturnFixture = () => undefined;

      (Transform as unknown as Mock).mockReturnValueOnce(transformMockReturnFixture);

      ParseArrayOf(String);
    });

    afterAll(() => {
      vi.clearAllMocks();
    });

    it('should call `Transform`', () => {
      expect(Transform).toHaveBeenCalledOnce();
    });
  });
});
