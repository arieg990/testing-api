import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { BasicStrategy as Strategy } from 'passport-http';
import { ExceptionsService } from '@core/exceptions/exception.service';
import { LoggerService } from '@core/logger/logger.service';
import { ApiClientUsecaseModule } from '@core/usecase/api-client-usecase.module';
import { Usecase } from '@core/usecase/usecase';
import { GetApiClientUsecase } from '@usecase/apiClient/get-api-client.usecase';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(ApiClientUsecaseModule.FIND_BY_USERNAME_API_CLIENT_USECASES)
    private readonly getApiClientUsecaseUsecase: Usecase<GetApiClientUsecase>,
    private readonly logger: LoggerService,
    private readonly exceptionService: ExceptionsService,
  ) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(req: Request, username: string, password: string) {
    const apiClient = await this.getApiClientUsecaseUsecase
      .getInstance()
      .execute({ username: username, password: password });
    if (!apiClient) {
      this.logger.warn('BasicStrategy', `Api Client not found`);
      this.exceptionService.UnauthorizedException({
        message: 'Unauthorized',
      });
    }
    return apiClient;
  }
}
