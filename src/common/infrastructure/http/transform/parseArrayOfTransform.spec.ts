import { BadRequestException } from '@nestjs/common';
import { plainToInstance, TransformFnParams } from 'class-transformer';
import { Mock } from 'vitest';

import { parseArrayOfTransform } from './parseArrayOfTransform';

vi.mock('class-transformer', async () => {
  const classTransformerCommon: object = await vi.importActual('class-transformer');

  return {
    ...classTransformerCommon,
    plainToInstance: vi.fn(),
  };
});

describe(parseArrayOfTransform.name, () => {
  describe('when called and value is not valid JSON', () => {
    let key: string;
    let transformFnParamsFixture: TransformFnParams;
    let result: unknown;

    beforeAll(async () => {
      key = 'arrayOfNumbers';
      transformFnParamsFixture = {
        key,
        value: 'not-valid-JSON',
      } as Partial<TransformFnParams> as TransformFnParams;

      try {
        result = parseArrayOfTransform(Number, transformFnParamsFixture);
      } catch (err) {
        result = err;
      }
    });

    afterAll(() => {
      vi.clearAllMocks();
    });

    it('should throw a BadRequestException', () => {
      expect(result).toBeInstanceOf(BadRequestException);
      expect((result as BadRequestException).message).toBe(`${key} property must be a valid JSON`);
    });
  });

  describe('when called and value is not valid array', () => {
    let key: string;
    let transformFnParamsFixture: TransformFnParams;
    let result: unknown;

    beforeAll(async () => {
      key = 'arrayOfNumbers';
      transformFnParamsFixture = {
        key,
        value: JSON.stringify({ notValidArray: 'notValidArray' }),
      } as Partial<TransformFnParams> as TransformFnParams;

      try {
        result = parseArrayOfTransform(Number, transformFnParamsFixture);
      } catch (err) {
        result = err;
      }
    });

    afterAll(() => {
      vi.clearAllMocks();
    });

    it('should throw a BadRequestException', () => {
      expect(result).toBeInstanceOf(BadRequestException);
      expect((result as BadRequestException).message).toBe(`${key} property must be a valid array`);
    });
  });

  describe('when called', () => {
    let key: string;
    let valueFixtures: number[];
    let transformFnParamsFixture: TransformFnParams;
    let result: unknown;

    beforeAll(async () => {
      key = 'arrayOfNumbers';
      valueFixtures = [1, 2, 3, 4, 5];
      transformFnParamsFixture = {
        key,
        value: JSON.stringify(valueFixtures),
      } as Partial<TransformFnParams> as TransformFnParams;

      for (const item of valueFixtures) {
        (plainToInstance as unknown as Mock).mockReturnValueOnce(item);
      }

      result = parseArrayOfTransform(Number, transformFnParamsFixture);
    });

    afterAll(() => {
      vi.clearAllMocks();
    });

    it('should call `plainToInstance`', () => {
      for (let i: number = 1; i < valueFixtures.length + 1; i++) {
        expect(plainToInstance).toHaveBeenNthCalledWith(i, Number, valueFixtures[i - 1]);
      }
    });

    it('result should be an Array', () => {
      expect(result).toStrictEqual(valueFixtures);
    });
  });
});
