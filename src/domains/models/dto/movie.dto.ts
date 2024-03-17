import { ApiProperty } from '@nestjs/swagger';

export class MovieDto {
  @ApiProperty({ example: '1' })
  id: string;
  @ApiProperty({ example: 'The legend of aang' })
  name: string;
  @ApiProperty({ example: 'This is description' })
  description: string;
}
