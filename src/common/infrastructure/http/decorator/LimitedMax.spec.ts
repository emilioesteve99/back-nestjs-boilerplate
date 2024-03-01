import { Transform, TransformFnParams } from 'class-transformer';
import { Mock } from 'vitest';

import { LimitedMax, replaceMaxValue } from './LimitedMax';

vi.mock('class-transformer', async () => {
  const classTransformerCommon: object = await vi.importActual('class-transformer');

  return {
    ...classTransformerCommon,
    Transform: vi.fn(),
  };
});

describe(replaceMaxValue.name, () => {
  describe('having a params.value less than value', () => {
    let paramsFixture: TransformFnParams;
    let valueFixture: number;
    let result: unknown;

    describe('when called', () => {
      beforeAll(() => {
        paramsFixture = { value: 1 } as TransformFnParams;
        valueFixture = 2;

        result = replaceMaxValue(paramsFixture, valueFixture);
      });

      it('should return params.value', () => {
        expect(result).toBe(paramsFixture.value);
      });
    });
  });

  describe('having a params.value greater than value', () => {
    let paramsFixture: TransformFnParams;
    let valueFixture: number;
    let result: unknown;

    describe('when called', () => {
      beforeAll(() => {
        paramsFixture = { value: 2 } as TransformFnParams;
        valueFixture = 1;

        result = replaceMaxValue(paramsFixture, valueFixture);
      });

      it('should return params.value', () => {
        expect(result).toBe(valueFixture);
      });
    });
  });
});

describe(LimitedMax.name, () => {
  let transformMockReturnFixture: PropertyDecorator;

  describe('when called', () => {
    beforeAll(() => {
      transformMockReturnFixture = () => undefined;

      (Transform as unknown as Mock).mockReturnValueOnce(transformMockReturnFixture);

      LimitedMax(1);
    });

    it('should call Transform', () => {
      expect(Transform).toHaveBeenCalledOnce();
    });
  });
});
