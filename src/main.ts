// eslint-disable-next-line import/order,@typescript-eslint/no-var-requires
import { AppConfig } from './config/infrastructure/app/AppConfig';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { FastifyError } from 'fastify';

import { AppModule } from './AppModule';

async function bootstrap(): Promise<void> {
  const app: NestFastifyApplication = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
    {
      cors: { origin: '*' },
    },
  );

  app
    .getHttpAdapter()
    .getInstance()
    .addHook('preHandler', (request: any, _reply: any, done: (error?: FastifyError) => void): void => {
      Object.assign(request.raw, { body: request.body });
      done();
    });

  app.useGlobalPipes(
    new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true }, whitelist: true }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.enableShutdownHooks();

  const appConfig: AppConfig = app.get(AppConfig);

  await app.listen(appConfig.port, '0.0.0.0');
}

void bootstrap();
