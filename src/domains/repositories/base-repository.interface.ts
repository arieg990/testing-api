import { Transaction } from 'sequelize';
import { PaginatorDto } from '@domains/models/paginator/paginator.dto';
import { IRequest } from '@domains/models/request/request.interface';

export interface BaseRepository<Req, Res> {
  create(request: Req, transaction?: Transaction): Promise<Res>;
  update(id: number, request: Req, transaction?: Transaction): Promise<Res>;
  findAll(filter: IRequest): Promise<PaginatorDto<any>>;
  getById(id: number): Promise<Res>;
  delete(id: number, transaction?: Transaction): Promise<boolean>;
}
