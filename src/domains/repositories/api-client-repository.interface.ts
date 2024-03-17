import { ApiClient } from '@core/entity/api-client.entity';

export interface ApiClientRepository {
  getByUsername(username: string): Promise<ApiClient>;
}
