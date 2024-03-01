import { BadRequestException } from '@nestjs/common';
import { TransformFnParams } from 'class-transformer';

import { parseBooleanTransform } from './parseBooleanTransform';

describe(parseBooleanTransform.name, () => {
  describe('when called and value is not a valid boolean', () => {
    let key: string;
    let transformFnParamsFixture: TransformFnParams;
    let result: unknown;

    beforeAll(async () => {
      key = 'boolean';
      transformFnParamsFixture = {
        key,
        obj: {
          [key]: 'not-valid-boolean',
        },
      } as Partial<TransformFnParams> as TransformFnParams;

      try {
        result = parseBooleanTransform(transformFnParamsFixture);
      } catch (err) {
        result = err;
      }
    });

    afterAll(() => {
      vi.clearAllMocks();
    });

    it('should throw a BadRequestException', () => {
      expect(result).toBeInstanceOf(BadRequestException);
      expect((result as BadRequestException).message).toBe(`${key} property must be a valid boolean`);
    });
  });

  describe('when called', () => {
    let key: string;
    let valueFixture: boolean;
    let transformFnParamsFixture: TransformFnParams;
    let result: unknown;

    beforeAll(async () => {
      key = 'boolean';
      valueFixture = true;
      transformFnParamsFixture = {
        key,
        obj: {
          [key]: 'true',
        },
      } as Partial<TransformFnParams> as TransformFnParams;

      result = parseBooleanTransform(transformFnParamsFixture);
    });

    afterAll(() => {
      vi.clearAllMocks();
    });

    it('result should be a boolean', () => {
      expect(result).toStrictEqual(valueFixture);
    });
  });
});
