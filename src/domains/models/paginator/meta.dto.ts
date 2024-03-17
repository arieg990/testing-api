import { ApiProperty } from '@nestjs/swagger';

export class MetaDto {
  @ApiProperty({ example: 5 })
  lastPage: number;
  @ApiProperty({ example: 50 })
  total: number;
  @ApiProperty({ example: 1 })
  current: number;
  @ApiProperty({ example: true })
  hasMorePages: boolean;
  @ApiProperty({ example: 10 })
  pageSize: number;
}
