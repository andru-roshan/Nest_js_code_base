/* eslint-disable prettier/prettier */
import { Min, MinLength } from 'class-validator';
export class userDetailsDto {
  @MinLength(3)
  employee_name: string;

  id: string;
  @Min(4)
  employee_salary: number;
  @Min(2)
  employee_age: number;
}
