import { ApiClient } from '@core/entity/api-client.entity';
import { GetApiClientRequest } from '@domains/models/request/get-api-client.request';
import { ApiClientRepository } from '@domains/repositories/api-client-repository.interface';
import { IBcryptService } from '@domains/services/bcrypt-service.interface';
import { IUsecase } from '@domains/usecase/usecase.interface';

export class GetApiClientUsecase
  implements IUsecase<GetApiClientRequest, ApiClient>
{
  constructor(
    private readonly bcryptService: IBcryptService,
    private readonly apiClientRepository: ApiClientRepository,
  ) {}

  async execute(request: GetApiClientRequest): Promise<ApiClient> {
    const apiClient = await this.apiClientRepository.getByUsername(
      request.username,
    );
    if (!apiClient) {
      return null;
    }

    const match = await this.bcryptService.compare(
      request.password,
      apiClient.password,
    );
    if (match) return apiClient;
    return null;
  }
}
