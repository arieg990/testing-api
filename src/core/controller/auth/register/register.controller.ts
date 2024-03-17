import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { BasicAuthGuard } from '@core/common/guards/basic-auth.guard';
import {
  ResponseMessage,
  ResponseMessageDecorator,
} from '@core/common/interceptors/response.decorator';
import { ApiFailedResponseType } from '@core/common/swagger/failed-response.decorator';
import { ApiResponseType } from '@core/common/swagger/response.decorator';
import { AuthUsecaseModule } from '@core/usecase/auth-usecase.module';
import { Usecase } from '@core/usecase/usecase';
import { UserDto } from '@domains/models/dto/user.dto';
import { RegisterUserRequest } from '@domains/models/request/user/register-user.request';
import { IUsecase } from '@domains/usecase/usecase.interface';

@Controller('auth')
@ApiTags('Auth')
@UseGuards(BasicAuthGuard)
@ApiBasicAuth()
@ApiFailedResponseType(['dob must be yyyy-mm-dd'], 400, true)
@ApiFailedResponseType('No authorization token was found', 401, false)
@ApiFailedResponseType('Internal server error', 500, false)
@ApiExtraModels(UserDto)
export class RegisterController {
  constructor(
    @Inject(AuthUsecaseModule.REGISTER_USECASES)
    private readonly registerUsecase: Usecase<
      IUsecase<RegisterUserRequest, UserDto>
    >,
  ) {}

  @Post('register')
  @ApiResponseType(UserDto, false)
  @ApiBody({ type: RegisterUserRequest })
  @ResponseMessage(ResponseMessageDecorator.RESULT_REGISTER_SUCCESS)
  @ApiOperation({ description: 'Register User' })
  async register(@Body() request: RegisterUserRequest): Promise<UserDto> {
    return this.registerUsecase.getInstance().execute(request);
  }
}
