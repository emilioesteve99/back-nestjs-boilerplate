import { BadRequestException } from '@nestjs/common';
import { TransformFnParams } from 'class-transformer';

import { normalizePhoneTransform } from './normalizePhoneTransform';

describe(normalizePhoneTransform.name, () => {
  describe('when called and value is not a valid phone', () => {
    let key: string;
    let transformFnParamsFixture: TransformFnParams;
    let result: unknown;

    beforeAll(async () => {
      key = 'phone';
      transformFnParamsFixture = {
        key,
        obj: {
          [key + key]: 'not-valid-phone',
        },
      } as Partial<TransformFnParams> as TransformFnParams;

      try {
        result = normalizePhoneTransform(transformFnParamsFixture);
      } catch (err) {
        result = err;
      }
    });

    afterAll(() => {
      vi.clearAllMocks();
    });

    it('should throw a BadRequestException', () => {
      expect(result).toBeInstanceOf(BadRequestException);
      expect((result as BadRequestException).message).toBe(`${key} property must be a valid phone`);
    });
  });

  describe('when called', () => {
    let key: string;
    let valueFixture: string;
    let phoneFixture: string;
    let transformFnParamsFixture: TransformFnParams;
    let result: unknown;

    beforeAll(async () => {
      key = 'phone';
      valueFixture = '+34666 666 666';
      phoneFixture = '+34666666666';
      transformFnParamsFixture = {
        key,
        obj: {
          [key]: valueFixture,
        },
      } as Partial<TransformFnParams> as TransformFnParams;

      result = normalizePhoneTransform(transformFnParamsFixture);
    });

    afterAll(() => {
      vi.clearAllMocks();
    });

    it('result should be a phone string', () => {
      expect(result).toStrictEqual(phoneFixture);
    });
  });
});
