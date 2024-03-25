/* eslint-disable prettier/prettier */
import { MinLength } from 'class-validator';
export class userDetailsDto {
  @MinLength(3)
  employee_name: string;

  id: string;

  employee_email: string;

  employee_id: string;

  role?: string;

  password: string;
}
