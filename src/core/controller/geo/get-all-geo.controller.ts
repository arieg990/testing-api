import {
  Controller,
  Get,
  Inject,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@core/common/guards/jwt-auth.guard';
import {
  ResponseMessage,
  ResponseMessageDecorator,
} from '@core/common/interceptors/response.decorator';
import { ApiFailedResponseType } from '@core/common/swagger/failed-response.decorator';
import { ApiResponseType } from '@core/common/swagger/response.decorator';
import { GeoUsecaseModule } from '@core/usecase/geo-usecase.module';
import { Usecase } from '@core/usecase/usecase';
import { GeoDto } from '@domains/models/dto/geo.dto';
import { PaginatorDto } from '@domains/models/paginator/paginator.dto';
import { FilterRequest } from '@domains/models/request/filter.request';
import { IUsecase } from '@domains/usecase/usecase.interface';

@Controller()
@ApiTags('Geo')
@ApiFailedResponseType('No authorization token was found', 401, false)
@ApiFailedResponseType('Internal server error', 500, false)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiExtraModels(GeoDto)
export class GetAllGeoController {
  constructor(
    @Inject(GeoUsecaseModule.FIND_ALL_GEO_USECASES)
    private readonly findAllGeoUsecase: Usecase<
      IUsecase<FilterRequest, PaginatorDto<GeoDto>>
    >,
  ) {}

  @Get()
  @ApiResponseType(GeoDto, true)
  @ResponseMessage(ResponseMessageDecorator.RESULT_OK)
  @ApiOperation({ description: 'Get all Geo' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Query() request: FilterRequest): Promise<PaginatorDto<GeoDto>> {
    return this.findAllGeoUsecase.getInstance().execute(request);
  }
}
