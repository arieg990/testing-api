import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@domains/enums/gender.enum';

export class UserSimpleDto {
  @ApiProperty({ example: '1' })
  id: string;
  @ApiProperty({ example: 'admin' })
  name: string;
  @ApiProperty({ example: '2022-10-10' })
  dob: string;
  @ApiProperty({ example: 'l', examples: ['l', 'p'] })
  gender: Gender;
}
