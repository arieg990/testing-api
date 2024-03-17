import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenUserRequest {
  @ApiProperty({
    example: '1234',
  })
  refreshToken: string;

  @ApiProperty({
    example: 'admin@admin.com',
  })
  username: string;
}
