import { Module, Provider } from '@nestjs/common';
import { CqrsModule, ICommandHandler, IQueryHandler } from '@nestjs/cqrs';

import { Converter } from '../../../common/domain/converter/Converter';
import { Manager } from '../../../common/domain/manager/Manager';
import { CommonModule } from '../../../common/infrastructure/injection/CommonModule';
import { SignAuthTokenCommandHandler } from '../../application/commandHandler/SignAuthTokenCommandHandler';
import { ValidatePasswordCommandHandler } from '../../application/commandHandler/ValidatePasswordCommandHandler';
import { VerifyTokenCommandHandler } from '../../application/commandHandler/VerifyTokenCommandHandler';
import { SignAuthTokenManager } from '../../domain/manager/SignAuthTokenManager';
import { ValidatePasswordManager } from '../../domain/manager/ValidatePasswordManager';
import { VerifyTokenManager } from '../../domain/manager/VerifyTokenManager';
import { ValidatePasswordBcryptAdapter } from '../bcrypt/adapter/ValidatePasswordBcryptAdapter';
import { LogInControllerV1 } from '../http/controller/LogInControllerV1';
import { SignAuthTokenJwtAdapter } from '../jwt/adapter/SignAuthTokenJwtAdapter';
import { VerifyTokenJwtAdapter } from '../jwt/adapter/VerifyTokenJwtAdapter';

const adapters: Provider<unknown>[] = [SignAuthTokenJwtAdapter, ValidatePasswordBcryptAdapter, VerifyTokenJwtAdapter];

const commandHandlers: Provider<ICommandHandler>[] = [
  SignAuthTokenCommandHandler,
  ValidatePasswordCommandHandler,
  VerifyTokenCommandHandler,
];

const converters: Provider<Converter<unknown, unknown>>[] = [];

const managers: Provider<Manager<unknown, unknown>>[] = [
  SignAuthTokenManager,
  ValidatePasswordManager,
  VerifyTokenManager,
];

const queryHandlers: Provider<IQueryHandler>[] = [];

@Module({
  controllers: [LogInControllerV1],
  imports: [CommonModule, CqrsModule],
  providers: [...adapters, ...commandHandlers, ...converters, ...managers, ...queryHandlers],
})
export class AuthModule {}
