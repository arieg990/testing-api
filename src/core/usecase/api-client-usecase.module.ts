import { DynamicModule, Module } from '@nestjs/common';
import { ApiClientDbRepository } from '@core/repositories/api-client-db.repository';
import { BcryptModule } from '@core/services/bcrypt/bcrypt.module';
import { BcryptService } from '@core/services/bcrypt/bcrypt.service';
import { GetApiClientUsecase } from '@usecase/apiClient/get-api-client.usecase';
import { RepositoriesModule } from '../repositories/repository.module';
import { Usecase } from './usecase';

@Module({
  imports: [RepositoriesModule, BcryptModule],
})
export class ApiClientUsecaseModule {
  static FIND_BY_USERNAME_API_CLIENT_USECASES =
    'findByUsernameApiCLientUsecases';

  static register(): DynamicModule {
    return {
      module: ApiClientUsecaseModule,
      providers: [
        {
          inject: [ApiClientDbRepository, BcryptService],
          provide: this.FIND_BY_USERNAME_API_CLIENT_USECASES,
          useFactory: (
            apiClientDbRepository: ApiClientDbRepository,
            bcryptService: BcryptService,
          ) =>
            new Usecase(
              new GetApiClientUsecase(bcryptService, apiClientDbRepository),
            ),
        },
      ],
      exports: [this.FIND_BY_USERNAME_API_CLIENT_USECASES],
    };
  }
}
