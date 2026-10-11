import { ApiProperty } from '@nestjs/swagger';

import { PaginationMetaHttp } from './PaginationMetaHttp';

export class PaginationHttp<TModel> {
  @ApiProperty()
  public items!: TModel[];

  @ApiProperty()
  public meta!: PaginationMetaHttp;
}
