import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, Provider } from '@nestjs/common';
import { CqrsModule, ICommandHandler, IQueryHandler } from '@nestjs/cqrs';

import { Converter } from '../../../common/domain/converter/Converter';
import { Manager } from '../../../common/domain/manager/Manager';
import { CommonModule } from '../../../common/infrastructure/injection/CommonModule';
import { UserFindQueryHandler } from '../../application/queryHandler/UserFindQueryHandler';
import { UserPaginateFindQueryHandler } from '../../application/queryHandler/UserPaginateFindQueryHandler';
import { FindUserManager } from '../../domain/manager/FindUserManager';
import { PaginateFindUserManager } from '../../domain/manager/PaginateFindUserManager';
import { PaginateFindUserControllerV1 } from '../http/controller/PaginateFindUserControllerV1';
import { FindUserMikroOrmAdapter } from '../mikroOrm/adapter/FindUserMikroOrmAdapter';
import { PaginateFindUserMikroOrmAdapter } from '../mikroOrm/adapter/PaginateFindUserMikroOrmAdapter';
import { UserFindQueryToUserFindOptionsQueryMikroOrmConverterAsync } from '../mikroOrm/converter/UserFindQueryToUserFindOptionsQueryMikroOrmConverterAsync';
import { UserFindQueryToUserFindQueryMikroOrmConverterAsync } from '../mikroOrm/converter/UserFindQueryToUserFindQueryMikroOrmConverterAsync';
import { UserMikroOrmToPaginationUserConverterAsync } from '../mikroOrm/converter/UserMikroOrmToPaginationUserConverterAsync';
import { UserMikroOrmToUserConverterAsync } from '../mikroOrm/converter/UserMikroOrmToUserConverterAsync';
import { UserPaginateFindQueryToUserFindOptionsQueryMikroOrmConverterAsync } from '../mikroOrm/converter/UserPaginateFindQueryToUserFindOptionsQueryMikroOrmConverterAsync';
import { UserPaginateFindQueryToUserFindQueryMikroOrmConverterAsync } from '../mikroOrm/converter/UserPaginateFindQueryToUserFindQueryMikroOrmConverterAsync';
import { UserSortKeyAndOrderTypeArrayToUserQueryOrderMapMikroOrmArrayConverter } from '../mikroOrm/converter/UserSortKeyAndOrderTypeArrayToUserQueryOrderMapMikroOrmArrayConverter';
import { UserSortKeyAndOrderTypeToUserQueryOrderMapMikroOrmConverter } from '../mikroOrm/converter/UserSortKeyAndOrderTypeToUserQueryOrderMapMikroOrmConverter';
import { UserMikroOrm } from '../mikroOrm/model/UserMikroOrm';

const adapters: Provider<unknown>[] = [FindUserMikroOrmAdapter, PaginateFindUserMikroOrmAdapter];

const commandHandlers: Provider<ICommandHandler>[] = [];

const converters: Provider<Converter<unknown, unknown>>[] = [
  UserFindQueryToUserFindOptionsQueryMikroOrmConverterAsync,
  UserFindQueryToUserFindQueryMikroOrmConverterAsync,
  UserMikroOrmToUserConverterAsync,
  UserMikroOrmToPaginationUserConverterAsync,
  UserPaginateFindQueryToUserFindOptionsQueryMikroOrmConverterAsync,
  UserPaginateFindQueryToUserFindQueryMikroOrmConverterAsync,
  UserSortKeyAndOrderTypeArrayToUserQueryOrderMapMikroOrmArrayConverter,
  UserSortKeyAndOrderTypeToUserQueryOrderMapMikroOrmConverter,
];

const managers: Provider<Manager<unknown, unknown>>[] = [FindUserManager, PaginateFindUserManager];

const queryHandlers: Provider<IQueryHandler>[] = [UserFindQueryHandler, UserPaginateFindQueryHandler];

@Module({
  controllers: [PaginateFindUserControllerV1],
  imports: [CommonModule, CqrsModule, MikroOrmModule.forFeature([UserMikroOrm])],
  providers: [...adapters, ...commandHandlers, ...converters, ...managers, ...queryHandlers],
})
export class UserModule {}
