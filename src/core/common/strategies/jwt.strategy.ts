import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvironmentConfigService } from '@core/config/environment/environtment-config.service';
import { ExceptionsService } from '@core/exceptions/exception.service';
import { LoggerService } from '@core/logger/logger.service';
import { AuthUsecaseModule } from '@core/usecase/auth-usecase.module';
import { Usecase } from '@core/usecase/usecase';
import { UserJwtUsecase } from '@usecase/auth/user-jwt.usecase';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: EnvironmentConfigService,
    @Inject(AuthUsecaseModule.USER_JWT_USECASES)
    private readonly userJwtUsecase: Usecase<UserJwtUsecase>,
    private readonly logger: LoggerService,
    private readonly exceptionService: ExceptionsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getJwtSecret(),
    });
  }

  async validate(payload: any) {
    const user = await this.userJwtUsecase
      .getInstance()
      .execute(payload.username);
    if (!user) {
      this.logger.warn('JwtStrategy', `User not found`);
      this.exceptionService.UnauthorizedException({
        message: 'User not found',
      });
    }
    return user;
  }
}
