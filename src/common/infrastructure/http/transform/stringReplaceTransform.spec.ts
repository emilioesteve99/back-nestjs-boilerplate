import { BadRequestException } from '@nestjs/common';
import { TransformFnParams } from 'class-transformer';

import { stringReplaceTransform } from './stringReplaceTransform';

describe(stringReplaceTransform.name, () => {
  describe('when called and value is not a string', () => {
    let key: string;
    let transformFnParamsFixture: TransformFnParams;
    let result: unknown;

    beforeAll(async () => {
      key = 'integer';
      transformFnParamsFixture = {
        key,
        value: 0,
      } as Partial<TransformFnParams> as TransformFnParams;

      try {
        result = stringReplaceTransform(transformFnParamsFixture, '', '');
      } catch (err) {
        result = err;
      }
    });

    afterAll(() => {
      vi.clearAllMocks();
    });

    it('should throw a BadRequestException', () => {
      expect(result).toBeInstanceOf(BadRequestException);
      expect((result as BadRequestException).message).toBe(`${key} property must be a string`);
    });
  });

  describe('when called', () => {
    let key: string;
    let transformFnParamsFixture: TransformFnParams;
    let result: string;

    beforeAll(async () => {
      key = 'string';
      transformFnParamsFixture = {
        key,
        value: 'a',
      } as Partial<TransformFnParams> as TransformFnParams;

      result = stringReplaceTransform(transformFnParamsFixture, 'a', 'b');
    });

    afterAll(() => {
      vi.clearAllMocks();
    });

    it('result should be a string', () => {
      expect(result).toBe('b');
    });
  });
});
