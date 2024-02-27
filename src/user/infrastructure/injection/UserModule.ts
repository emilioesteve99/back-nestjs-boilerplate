import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, Provider } from '@nestjs/common';
import { CqrsModule, ICommandHandler, IQueryHandler } from '@nestjs/cqrs';

import { Converter } from '../../../common/domain/converter/Converter';
import { Manager } from '../../../common/domain/manager/Manager';
import { CommonModule } from '../../../common/infrastructure/injection/CommonModule';
import { UserInsertOneCommandHandler } from '../../application/commandHandler/UserInsertOneCommandHandler';
import { UserFindOneQueryHandler } from '../../application/queryHandler/UserFindOneQueryHandler';
import { UserFindQueryHandler } from '../../application/queryHandler/UserFindQueryHandler';
import { UserPaginateFindQueryHandler } from '../../application/queryHandler/UserPaginateFindQueryHandler';
import { FindOneUserManager } from '../../domain/manager/FindOneUserManager';
import { FindUserManager } from '../../domain/manager/FindUserManager';
import { InsertOneUserManager } from '../../domain/manager/InsertOneUserManager';
import { PaginateFindUserManager } from '../../domain/manager/PaginateFindUserManager';
import { EncryptUserPasswordBcryptAdapter } from '../bcrypt/adapter/EncryptUserPasswordBcryptAdapter';
import { InsertOneUserControllerV1 } from '../http/controller/InsertOneUserControllerV1';
import { PaginateFindUserControllerV1 } from '../http/controller/PaginateFindUserControllerV1';
import { FindOneUserMikroOrmAdapter } from '../mikroOrm/adapter/FindOneUserMikroOrmAdapter';
import { FindUserMikroOrmAdapter } from '../mikroOrm/adapter/FindUserMikroOrmAdapter';
import { InsertOneUserMikroOrmAdapter } from '../mikroOrm/adapter/InsertOneUserMikroOrmAdapter';
import { PaginateFindUserMikroOrmAdapter } from '../mikroOrm/adapter/PaginateFindUserMikroOrmAdapter';
import { UserFindOneQueryToUserFindOneOptionsQueryMikroOrmConverterAsync } from '../mikroOrm/converter/UserFindOneQueryToUserFindOneOptionsQueryMikroOrmConverterAsync';
import { UserFindQueryToUserFindOptionsQueryMikroOrmConverterAsync } from '../mikroOrm/converter/UserFindQueryToUserFindOptionsQueryMikroOrmConverterAsync';
import { UserFindQueryToUserFindQueryMikroOrmConverterAsync } from '../mikroOrm/converter/UserFindQueryToUserFindQueryMikroOrmConverterAsync';
import { UserInsertOneCommandToUserInsertOneQueryMikroOrmConverterAsync } from '../mikroOrm/converter/UserInsertOneCommandToUserInsertOneQueryMikroOrmConverterAsync';
import { UserMikroOrmToPaginationUserConverterAsync } from '../mikroOrm/converter/UserMikroOrmToPaginationUserConverterAsync';
import { UserMikroOrmToUserConverterAsync } from '../mikroOrm/converter/UserMikroOrmToUserConverterAsync';
import { UserPaginateFindQueryToUserFindOptionsQueryMikroOrmConverterAsync } from '../mikroOrm/converter/UserPaginateFindQueryToUserFindOptionsQueryMikroOrmConverterAsync';
import { UserPaginateFindQueryToUserFindQueryMikroOrmConverterAsync } from '../mikroOrm/converter/UserPaginateFindQueryToUserFindQueryMikroOrmConverterAsync';
import { UserSortKeyAndOrderTypeArrayToUserQueryOrderMapMikroOrmArrayConverter } from '../mikroOrm/converter/UserSortKeyAndOrderTypeArrayToUserQueryOrderMapMikroOrmArrayConverter';
import { UserSortKeyAndOrderTypeToUserQueryOrderMapMikroOrmConverter } from '../mikroOrm/converter/UserSortKeyAndOrderTypeToUserQueryOrderMapMikroOrmConverter';
import { UserMikroOrm } from '../mikroOrm/model/UserMikroOrm';

const adapters: Provider<unknown>[] = [
  EncryptUserPasswordBcryptAdapter,
  FindOneUserMikroOrmAdapter,
  FindUserMikroOrmAdapter,
  InsertOneUserMikroOrmAdapter,
  PaginateFindUserMikroOrmAdapter,
];

const commandHandlers: Provider<ICommandHandler>[] = [UserInsertOneCommandHandler];

const converters: Provider<Converter<unknown, unknown>>[] = [
  UserFindOneQueryToUserFindOneOptionsQueryMikroOrmConverterAsync,
  UserFindQueryToUserFindOptionsQueryMikroOrmConverterAsync,
  UserFindQueryToUserFindQueryMikroOrmConverterAsync,
  UserInsertOneCommandToUserInsertOneQueryMikroOrmConverterAsync,
  UserMikroOrmToUserConverterAsync,
  UserMikroOrmToPaginationUserConverterAsync,
  UserPaginateFindQueryToUserFindOptionsQueryMikroOrmConverterAsync,
  UserPaginateFindQueryToUserFindQueryMikroOrmConverterAsync,
  UserSortKeyAndOrderTypeArrayToUserQueryOrderMapMikroOrmArrayConverter,
  UserSortKeyAndOrderTypeToUserQueryOrderMapMikroOrmConverter,
];

const managers: Provider<Manager<unknown, unknown>>[] = [
  FindOneUserManager,
  FindUserManager,
  InsertOneUserManager,
  PaginateFindUserManager,
];

const queryHandlers: Provider<IQueryHandler>[] = [
  UserFindOneQueryHandler,
  UserFindQueryHandler,
  UserPaginateFindQueryHandler,
];

@Module({
  controllers: [InsertOneUserControllerV1, PaginateFindUserControllerV1],
  imports: [CommonModule, CqrsModule, MikroOrmModule.forFeature([UserMikroOrm])],
  providers: [...adapters, ...commandHandlers, ...converters, ...managers, ...queryHandlers],
})
export class UserModule {}
