import { ApiClient } from '@core/entity/api-client.entity';
import { EntityModule } from '@core/entity/entity.module';
import { ApiClientRepository } from '@domains/repositories/api-client-repository.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ApiClientDbRepository implements ApiClientRepository {
  constructor(
    @Inject(EntityModule.API_CLIENT_ENTITY)
    private readonly apiClientRepository: typeof ApiClient,
  ) {}

  async getByUsername(username: string): Promise<ApiClient> {
    return await this.apiClientRepository.findOne({
      where: {
        username: username,
      },
    });
  }
}
