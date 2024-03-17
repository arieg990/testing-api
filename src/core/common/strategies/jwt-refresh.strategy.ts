import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvironmentConfigService } from '@core/config/environment/environtment-config.service';
import { ExceptionsService } from '@core/exceptions/exception.service';
import { LoggerService } from '@core/logger/logger.service';
import { AuthUsecaseModule } from '@core/usecase/auth-usecase.module';
import { Usecase } from '@core/usecase/usecase';
import { TokenPayload } from '@domains/models/token-payload.interface';
import { GetUserWhenRefreshTokenUsecase } from '@usecase/auth/get-user-when-refresh-token.usecase';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly configService: EnvironmentConfigService,
    @Inject(AuthUsecaseModule.GET_USER_REFRESH_TOKEN_JWT_USECASES)
    private readonly getUserWhenRefreshTokenUsecase: Usecase<GetUserWhenRefreshTokenUsecase>,
    private readonly logger: LoggerService,
    private readonly exceptionService: ExceptionsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getJwtRefreshSecret(),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: TokenPayload) {
    const refreshToken = request.headers.authorization.replace('Bearer ', '');
    const user = await this.getUserWhenRefreshTokenUsecase
      .getInstance()
      .execute({ refreshToken: refreshToken, username: payload.username });
    if (!user) {
      this.logger.warn('JwtStrategy', `User not found or hash not correct`);
      this.exceptionService.UnauthorizedException({
        message: 'User not found or hash not correct',
      });
    }
    return user;
  }
}
