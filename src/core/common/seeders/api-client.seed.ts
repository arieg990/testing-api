import { Inject, Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { ApiClient } from '@core/entity/api-client.entity';
import { EntityModule } from '@core/entity/entity.module';
import { BcryptService } from '@core/services/bcrypt/bcrypt.service';
import { ApiClientModel } from '@domains/models/api-client.model';

@Injectable()
export class SeedApiClient implements Seeder {
  constructor(
    @Inject(EntityModule.API_CLIENT_ENTITY)
    private readonly entity: typeof ApiClient,
    private readonly bcryptService: BcryptService,
  ) {}

  async seed(): Promise<any> {
    const apiClient = new ApiClientModel();
    apiClient.username = 'w3b';
    apiClient.password = await this.bcryptService.hash('P4ssw0rd');
    return this.entity.create(apiClient);
  }
  drop(): Promise<any> {
    return this.entity.destroy();
  }
}
