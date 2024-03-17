import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ExceptionsService } from '@core/exceptions/exception.service';
import { LoggerService } from '@core/logger/logger.service';
import { AuthUsecaseModule } from '@core/usecase/auth-usecase.module';
import { Usecase } from '@core/usecase/usecase';
import { LoginUsecase } from '@usecase/auth/login.usecase';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AuthUsecaseModule.LOGIN_USECASES)
    private readonly loginUsecase: Usecase<LoginUsecase>,
    private readonly logger: LoggerService,
    private readonly exceptionService: ExceptionsService,
  ) {
    super();
  }

  async validate(username: string, password: string) {
    if (!username || !password) {
      this.logger.warn(
        'LocalStrategy',
        `Username or password is missing, BadRequestException`,
      );
      this.exceptionService.UnauthorizedException();
    }
    const user = await this.loginUsecase
      .getInstance()
      .execute({ username: username, password: password });
    if (!user) {
      this.logger.warn('LocalStrategy', `Invalid username or password`);
      this.exceptionService.UnauthorizedException({
        message: 'Invalid username or password.',
      });
    }
    return user;
  }
}
