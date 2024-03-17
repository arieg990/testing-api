import { ApiProperty } from '@nestjs/swagger';

export class GeoDto {
  @ApiProperty({ example: '1' })
  id: string;
  @ApiProperty({ example: '1' })
  user_id: string;
  @ApiProperty({ example: 'uploads/west-java.json' })
  file_path: string;
}
