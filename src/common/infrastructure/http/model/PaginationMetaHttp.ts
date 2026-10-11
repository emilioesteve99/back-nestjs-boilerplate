import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetaHttp {
  @ApiProperty()
  public currentPage!: number;

  @ApiProperty()
  public itemCount!: number;

  @ApiProperty()
  public itemsPerPage!: number;

  @ApiProperty()
  public totalItems!: number;

  @ApiProperty()
  public totalPages!: number;
}
