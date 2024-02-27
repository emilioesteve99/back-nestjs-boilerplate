import { Controller, Get, Query, Version } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BaseUserController } from './BaseUserController';
import { Pagination } from '../../../../common/domain/model/Pagination';
import { ApiOkPaginationResponse } from '../../../../common/infrastructure/http/decorator/ApiOkPaginationResponse';
import { User } from '../../../domain/model/User';
import { UserFindQuery } from '../../../domain/query/UserFindQuery';
import { UserPaginateFindQuery } from '../../../domain/query/UserPaginateFindQuery';
import { PaginateFindUserHttpV1 } from '../model/PaginateFindUserHttpV1';
import { UserHttpV1 } from '../model/UserHttpV1';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class PaginateFindUserControllerV1 extends BaseUserController {
  public constructor(queryBus: QueryBus) {
    super(queryBus);
  }

  @ApiOperation({
    summary: 'Get Users',
  })
  @ApiOkPaginationResponse({
    description: 'Returns a paginated list of users',
    type: UserHttpV1,
  })
  @Version('1')
  @Get()
  public async find(@Query() query: PaginateFindUserHttpV1): Promise<Pagination<User>> {
    const userFindQuery: UserFindQuery = new UserFindQuery({});

    const paginatedUsers: Pagination<User> = await this.queryBus.execute(
      new UserPaginateFindQuery(userFindQuery, { limit: query.limit, page: query.page }),
    );

    paginatedUsers.items = this.fakeUsersPassword(paginatedUsers.items);

    return paginatedUsers;
  }
}
