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
import { MovieUsecaseModule } from '@core/usecase/movie-usecase.module';
import { Usecase } from '@core/usecase/usecase';
import { MovieDto } from '@domains/models/dto/movie.dto';
import { PaginatorDto } from '@domains/models/paginator/paginator.dto';
import { FilterRequest } from '@domains/models/request/filter.request';
import { IUsecase } from '@domains/usecase/usecase.interface';

@Controller()
@ApiTags('Movies')
@ApiFailedResponseType('No authorization token was found', 401, false)
@ApiFailedResponseType('Internal server error', 500, false)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiExtraModels(MovieDto)
export class GetAllMovieController {
  constructor(
    @Inject(MovieUsecaseModule.FIND_ALL_MOVIE_USECASES)
    private readonly findAllMovieUsecase: Usecase<
      IUsecase<FilterRequest, PaginatorDto<MovieDto>>
    >,
  ) {}

  @Get()
  @ApiResponseType(MovieDto, true)
  @ResponseMessage(ResponseMessageDecorator.RESULT_OK)
  @ApiOperation({ description: 'Get all movie' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(
    @Query() request: FilterRequest,
  ): Promise<PaginatorDto<MovieDto>> {
    return this.findAllMovieUsecase.getInstance().execute(request);
  }
}
