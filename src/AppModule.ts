import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Logger, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';

import { AppController } from './AppController';
import { AppHttpExceptionFilter } from './AppHttpExceptionFilter';
import { DatabaseConfig } from './config/infrastructure/database/DatabaseConfig';
import { getMikroOrmModuleOptions } from './config/infrastructure/database/getMikroOrmModuleOptions';
import { AppConfigModule } from './config/infrastructure/injection/AppConfigModule';
import { DatabaseConfigModule } from './config/infrastructure/injection/DatabaseConfigModule';

@Module({
  controllers: [AppController],
  imports: [
    AppConfigModule,
    CqrsModule,
    MikroOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      inject: [DatabaseConfig],
      useFactory: getMikroOrmModuleOptions,
    }),
  ],
  providers: [
    Logger,
    {
      provide: APP_FILTER,
      useClass: AppHttpExceptionFilter,
    },
  ],
})
export class AppModule {}
