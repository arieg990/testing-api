import { Transaction } from 'sequelize';
import Paginator from '@core/common/paginator/paginator';
import { FilterRequest } from '@domains/models/request/filter.request';
import { BaseRepository } from '@domains/repositories/base-repository.interface';

export abstract class BaseDbRepository<Req, Res>
  implements BaseRepository<Req, Res>
{
  protected fieldName: any[];
  protected constructor(protected readonly model: any) {}

  async upsert(request: Req, transaction?: Transaction): Promise<Res> {
    const result = await this.model.upsert(request, { transaction });
    return result[0];
  }
  async create(request: Req, transaction?: Transaction): Promise<Res> {
    return await this.model.create(request, { transaction });
  }

  async findAll(filter: FilterRequest): Promise<any> {
    const option = filter.option;
    const model = new Paginator(this.model);
    return model.paginate(
      this.fieldName,
      filter,
      filter.page,
      filter.perPage,
      option,
    );
  }

  async getById(id: number): Promise<Res> {
    return await this.model.scope('full').findByPk(id);
  }

  async update(
    id: number,
    request: Req,
    transaction?: Transaction,
  ): Promise<Res> {
    const country = await this.model.findByPk(id, { transaction });
    if (country != null) {
      return await country.update(request, { transaction });
    }
    return country;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.model.destroy({
      where: { id: id },
    });
    return result > 0;
  }
}
