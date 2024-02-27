import { Inject, Logger } from '@nestjs/common';
import { ICommand, IEvent, Saga } from '@nestjs/cqrs';
// import apm from 'elastic-apm-node';
import { catchError, Observable } from 'rxjs';

import { TypedMethodDecorator } from '../../domain/decorator/TypedMethodDecorator';

export function ErrorCatchingSaga<
  TThis extends { logger: Logger },
  TInput extends Observable<IEvent>,
  TOutput extends Observable<ICommand>,
>(): TypedMethodDecorator<(input: TInput) => TOutput> {
  const injector: PropertyDecorator & ParameterDecorator = Inject(Logger);
  const saga: PropertyDecorator = Saga();

  return function (
    target: unknown,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<(input: TInput) => TOutput>,
  ): TypedPropertyDescriptor<(input: TInput) => TOutput> {
    const method: (input: TInput) => TOutput = descriptor.value!;

    injector(target as { logger: Logger }, 'logger');
    saga(target as { logger: Logger }, propertyKey);

    descriptor.value = function (this: TThis, input: TInput): TOutput {
      return method.apply(this, [input]).pipe(
        catchError((error: Error) => {
          this.logger.error(error.message);
          // apm.captureError(error);
          return [];
        }),
      ) as TOutput;
    };

    return descriptor;
  };
}
