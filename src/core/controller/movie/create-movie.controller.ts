import { Body, Controller, Inject, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
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
import { CreateMovieRequest } from '@domains/models/request/create-movie.request';
import { CreateMovieUsecase } from '@usecase/movie/create-movie.usecase';

@Controller()
@ApiTags('Movies')
@ApiFailedResponseType(['name cannot be null'], 400, true)
@ApiFailedResponseType('No authorization token was found', 401, false)
@ApiFailedResponseType('Internal server error', 500, false)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiExtraModels(MovieDto)
export class CreateMovieController {
  constructor(
    @Inject(MovieUsecaseModule.CREATE_MOVIE_USECASES)
    private readonly createMovieUsecase: Usecase<CreateMovieUsecase>,
  ) {}

  @Post()
  @ApiResponseType(MovieDto, false)
  @ApiBody({ type: CreateMovieRequest })
  @ResponseMessage(ResponseMessageDecorator.RESULT_CREATED)
  @ApiOperation({ description: 'Create Movie' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() request: CreateMovieRequest): Promise<MovieDto> {
    return this.createMovieUsecase.getInstance().execute(request);
  }
}
