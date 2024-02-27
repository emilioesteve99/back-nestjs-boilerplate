import { ApiProperty } from '@nestjs/swagger';

import { PaginationMetaHttp } from './PaginationMetaHttp';

export class PaginationHttp<TModel> {
  @ApiProperty()
  items!: TModel[];

  @ApiProperty()
  meta!: PaginationMetaHttp;
}
