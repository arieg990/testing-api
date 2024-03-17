import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { IRequest } from '@domains/models/request/request.interface';

export class FilterRequest implements IRequest {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  perPage = 1;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  page = 25;

  @IsString()
  @IsOptional()
  search: string;

  @Transform(({ value }) => {
    try {
      return JSON.parse(value);
    } catch (ex) {
      return null;
    }
  })
  @IsOptional()
  option: any;

  @IsOptional()
  where: any;

  constructor(page = 1, perPage = 25) {
    this.page = page;
    this.perPage = perPage;
  }
}
