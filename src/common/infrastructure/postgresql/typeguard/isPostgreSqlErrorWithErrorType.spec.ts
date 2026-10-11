import { Mock } from 'vitest';
import { PostgreSqlErrorFixtures } from '../../../fixtures/infrastructure/postgresql/model/PostgreSqlErrorFixtures';
import { PostgreSqlError } from '../model/PostgreSqlError';
import { PostgreSqlErrorType } from '../model/PostgreSqlErrorType';
import { isPostgreSqlError } from './isPostgreSqlError';
import { isPostgreSqlErrorWithErrorType } from './isPostgreSqlErrorWithErrorType';

vi.mock('./isPostgreSqlError');

describe(isPostgreSqlErrorWithErrorType.name, () => {
  describe('when called and isPostgreSqlError() returns false', () => {
    let valueFixture: undefined;
    let result: unknown;

    beforeEach(() => {
      valueFixture = undefined;
      (isPostgreSqlError as unknown as Mock).mockReturnValueOnce(false);

      result = isPostgreSqlErrorWithErrorType(valueFixture, [PostgreSqlErrorFixtures.any.code]);
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it('should return false', () => {
      expect(result).toBe(false);
    });
  });

  describe('having a value PostgreSqlError and errorTypes including value.code', () => {
    let valueFixture: PostgreSqlError;
    let errorTypesFixture: PostgreSqlErrorType[];

    beforeEach(() => {
      valueFixture = PostgreSqlErrorFixtures.any;
      errorTypesFixture = [PostgreSqlErrorFixtures.any.code];
    });

    describe('when called and isPostgreSqlError() returns true', () => {
      let result: unknown;

      beforeEach(() => {
        (isPostgreSqlError as unknown as Mock).mockReturnValueOnce(true);

        result = isPostgreSqlErrorWithErrorType(valueFixture, errorTypesFixture);
      });

      afterEach(() => {
        vi.clearAllMocks();
      });

      it('should return true', () => {
        expect(result).toBe(true);
      });
    });
  });

  describe('having a value PostgreSqlError and errorTypes not including value.code', () => {
    let valueFixture: PostgreSqlError;
    let errorTypesFixture: PostgreSqlErrorType[];

    beforeEach(() => {
      valueFixture = PostgreSqlErrorFixtures.any;
      errorTypesFixture = [];
    });

    describe('when called and isPostgreSqlError() returns true', () => {
      let result: unknown;

      beforeEach(() => {
        (isPostgreSqlError as unknown as Mock).mockReturnValueOnce(true);

        result = isPostgreSqlErrorWithErrorType(valueFixture, errorTypesFixture);
      });

      afterEach(() => {
        vi.clearAllMocks();
      });

      it('should return false', () => {
        expect(result).toBe(false);
      });
    });
  });
});
