import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiClientModel } from '@domains/models/api-client.model';

@Table({
  modelName: 'api_clients',
  underscored: true,
})
export class ApiClient extends Model<ApiClientModel> {
  @Column(DataType.STRING)
  username: string;

  @Column(DataType.STRING)
  password: string;
}
