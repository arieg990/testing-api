import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { BasicStrategy as Strategy } from 'passport-http';
import { ExceptionsService } from '@core/exceptions/exception.service';
import { LoggerService } from '@core/logger/logger.service';
import { ApiClientUsecaseModule } from '@core/usecase/api-client-usecase.module';
import { AuthUsecaseModule } from '@core/usecase/auth-usecase.module';
import { Usecase } from '@core/usecase/usecase';
import { GetApiClientUsecase } from '@usecase/apiClient/get-api-client.usecase';
import { LoginUsecase } from '@usecase/auth/login.usecase';

@Injectable()
export class LoginBasicStrategy extends PassportStrategy(
  Strategy,
  'login-basic',
) {
  constructor(
    @Inject(ApiClientUsecaseModule.FIND_BY_USERNAME_API_CLIENT_USECASES)
    private readonly getApiClientUsecaseUsecase: Usecase<GetApiClientUsecase>,
    @Inject(AuthUsecaseModule.LOGIN_USECASES)
    private readonly loginUsecase: Usecase<LoginUsecase>,
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
    return this.login(req.body.username, req.body.password);
  }

  async login(username: string, password: string) {
    if (username == 'guest') {
      return { id: 'guest', username: 'guest', name: 'guest' };
    }

    if (!username || !password) {
      this.logger.warn(
        'BasicStrategy',
        `Username or password is missing, BadRequestException`,
      );
      this.exceptionService.UnauthorizedException();
    }
    const user = await this.loginUsecase
      .getInstance()
      .execute({ username: username, password: password });
    if (!user) {
      this.logger.warn('BasicStrategy', `Invalid username or password`);
      this.exceptionService.UnauthorizedException({
        message: 'Invalid username or password.',
      });
    }
    return user;
  }
}
