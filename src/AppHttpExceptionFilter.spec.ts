import { ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { captureError } from 'elastic-apm-node';
import { afterAll, beforeAll, describe, expect, it, Mock, vi } from 'vitest';

import { AppHttpExceptionFilter } from './AppHttpExceptionFilter';

vi.mock('elastic-apm-node', () => {
  return {
    captureError: vi.fn(),
  };
});

describe(AppHttpExceptionFilter.name, () => {
  let superCatchMock: Mock<[Error, ArgumentsHost], void>;
  let appHttpExceptionFilter: AppHttpExceptionFilter;

  beforeAll(() => {
    superCatchMock = vi.fn();
    BaseExceptionFilter.prototype.catch = superCatchMock;
    appHttpExceptionFilter = new AppHttpExceptionFilter();
  });

  describe(AppHttpExceptionFilter.prototype.catch.name, () => {
    let exceptionFixture: Error;
    let hostFixture: ArgumentsHost;

    beforeAll(() => {
      exceptionFixture = new Error();
      hostFixture = {} as ArgumentsHost;

      appHttpExceptionFilter.catch(exceptionFixture, hostFixture);
    });

    afterAll(() => {
      vi.clearAllMocks();
    });

    it('should call apm.captureError()', () => {
      expect(captureError).toHaveBeenCalledOnce();
      expect(captureError).toHaveBeenCalledWith(exceptionFixture);
    });

    it('should call apm.captureError()', () => {
      expect(superCatchMock).toHaveBeenCalledOnce();
      expect(superCatchMock).toHaveBeenCalledWith(exceptionFixture, hostFixture);
    });
  });
});
