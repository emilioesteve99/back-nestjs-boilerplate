import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetaHttp {
  @ApiProperty()
  currentPage!: number;

  @ApiProperty()
  itemCount!: number;

  @ApiProperty()
  itemsPerPage!: number;

  @ApiProperty()
  totalItems!: number;

  @ApiProperty()
  totalPages!: number;
}
