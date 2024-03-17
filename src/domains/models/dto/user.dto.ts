import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@domains/enums/gender.enum';

export class UserDto {
  @ApiProperty({ example: '1' })
  id: string;
  @ApiProperty({ example: 'admin' })
  name: string;
  @ApiProperty({ example: '2022-10-10' })
  dob: string;
  @ApiProperty({ example: 'l', examples: ['l', 'p'] })
  gender: Gender;
  @ApiProperty({ example: 'admin@admin.com' })
  username: string;
}
