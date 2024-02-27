import { ApiProperty } from '@nestjs/swagger';

import { BaseEntityHttpV1 } from '../../../../common/infrastructure/http/model/BaseEntityHttpV1';

export class UserHttpV1 extends BaseEntityHttpV1 {
  @ApiProperty()
  name!: string;
}
