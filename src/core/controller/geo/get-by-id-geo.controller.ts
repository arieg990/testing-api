import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
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
import { IUsecase } from '@domains/usecase/usecase.interface';

@Controller()
@ApiTags('Geo')
@ApiFailedResponseType('No authorization token was found', 401, false)
@ApiFailedResponseType('Internal server error', 500, false)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiExtraModels(GeoDto)
export class GetByIdGeoController {
  constructor(
    @Inject(GeoUsecaseModule.FIND_BY_ID_GEO_USECASES)
    private readonly findByIdGeoUsecase: Usecase<IUsecase<string, GeoDto>>,
  ) {}

  @Get(':id')
  @ApiResponseType(GeoDto, false)
  @ResponseMessage(ResponseMessageDecorator.RESULT_OK)
  @ApiOperation({ description: 'Geo Get By Id' })
  async login(@Param('id') id: string): Promise<GeoDto> {
    return this.findByIdGeoUsecase.getInstance().execute(id);
  }
}
