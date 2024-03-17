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
import { MovieUsecaseModule } from '@core/usecase/movie-usecase.module';
import { Usecase } from '@core/usecase/usecase';
import { MovieDto } from '@domains/models/dto/movie.dto';
import { IUsecase } from '@domains/usecase/usecase.interface';

@Controller()
@ApiTags('Movies')
@ApiFailedResponseType('No authorization token was found', 401, false)
@ApiFailedResponseType('Internal server error', 500, false)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiExtraModels(MovieDto)
export class GetByIdMovieController {
  constructor(
    @Inject(MovieUsecaseModule.FIND_BY_ID_MOVIE_USECASES)
    private readonly findByIdMovieUsecase: Usecase<IUsecase<string, MovieDto>>,
  ) {}

  @Get(':id')
  @ApiResponseType(MovieDto, false)
  @ResponseMessage(ResponseMessageDecorator.RESULT_OK)
  @ApiOperation({ description: 'Update Movie' })
  async login(@Param('id') id: string): Promise<MovieDto> {
    return this.findByIdMovieUsecase.getInstance().execute(id);
  }
}
