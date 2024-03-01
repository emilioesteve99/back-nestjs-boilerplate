import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { captureError } from 'elastic-apm-node';

@Catch()
export class AppHttpExceptionFilter extends BaseExceptionFilter {
  public override catch(exception: Error, host: ArgumentsHost): void {
    if (!(exception instanceof HttpException)) {
      captureError(exception);
    }

    super.catch(exception, host);
  }
}
