/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
export class userDetailsDto {
  @ApiProperty()
  employee_name: string;

  id: string;

  @ApiProperty()
  employee_email: string;

  @ApiProperty()
  employee_id: string;

  @ApiProperty()
  role?: string;

  @ApiProperty()
  password: string;
}
