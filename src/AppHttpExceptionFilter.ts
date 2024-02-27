import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import apm from 'elastic-apm-node';

@Catch()
export class AppHttpExceptionFilter extends BaseExceptionFilter {
  public override catch(exception: Error, host: ArgumentsHost): void {
    if (!(exception instanceof HttpException)) {
      apm.captureError(exception);
    }

    super.catch(exception, host);
  }
}
