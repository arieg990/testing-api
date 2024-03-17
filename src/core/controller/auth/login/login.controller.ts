import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { LoginBasicAuthGuard } from '@core/common/guards/login-basic-auth.guard';
import {
  ResponseMessage,
  ResponseMessageDecorator,
} from '@core/common/interceptors/response.decorator';
import { ApiFailedResponseType } from '@core/common/swagger/failed-response.decorator';
import { ApiResponseType } from '@core/common/swagger/response.decorator';
import { LoginPresenter } from '@core/controller/auth/login/login.presenter';
import { AuthUsecaseModule } from '@core/usecase/auth-usecase.module';
import { Usecase } from '@core/usecase/usecase';
import { LoginDto } from '@domains/models/dto/login.dto';
import { UserDto } from '@domains/models/dto/user.dto';
import { RefreshTokenRequest } from '@domains/models/request/refresh-token.request';
import { LoginUserRequest } from '@domains/models/request/user/login-user.request';
import { UserModel } from '@domains/models/user/user.model';
import { IUsecase } from '@domains/usecase/usecase.interface';

@Controller('auth')
@ApiTags('Auth')
@ApiFailedResponseType('No authorization token was found', 401, false)
@ApiFailedResponseType('Internal server error', 500, false)
@UseGuards(LoginBasicAuthGuard)
@ApiBasicAuth()
@ApiExtraModels(LoginPresenter)
export class LoginController {
  constructor(
    @Inject(AuthUsecaseModule.CREATE_TOKEN_JWT_USECASES)
    private readonly createTokenJwtUsecaseUsecase: Usecase<
      IUsecase<string, string>
    >,
    @Inject(AuthUsecaseModule.CREATE_REFRESH_TOKEN_JWT_USECASES)
    private readonly createRefreshTokenJwtUsecaseUsecase: Usecase<
      IUsecase<RefreshTokenRequest, string>
    >,
  ) {}

  @Post('login')
  @ApiResponseType(LoginPresenter, false)
  @ApiBody({ type: LoginUserRequest })
  @ResponseMessage(ResponseMessageDecorator.RESULT_LOGIN_SUCCESS)
  @ApiOperation({ description: 'Login User' })
  async login(
    @Body() auth: LoginUserRequest,
    @Req() request: Request,
  ): Promise<LoginDto> {
    let refreshToken = null;
    const accessToken = await this.createTokenJwtUsecaseUsecase
      .getInstance()
      .execute(auth.username);
    if ((request.user as UserDto).id != 'guest') {
      refreshToken = await this.createRefreshTokenJwtUsecaseUsecase
        .getInstance()
        .execute({
          username: auth.username,
          userId: (request.user as UserModel).id,
        });
    }
    return {
      user: request.user as UserDto,
      accessToken,
      refreshToken,
    };
  }
}
