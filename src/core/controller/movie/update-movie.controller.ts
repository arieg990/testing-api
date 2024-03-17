import {
  Body,
  Controller,
  Inject,
  Param,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
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
import { UpdateMovieRequest } from '@domains/models/request/update-movie.request';
import { IUsecase } from '@domains/usecase/usecase.interface';

@Controller()
@ApiTags('Movies')
@ApiFailedResponseType('No authorization token was found', 401, false)
@ApiFailedResponseType('Internal server error', 500, false)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiExtraModels(MovieDto)
export class UpdateMovieController {
  constructor(
    @Inject(MovieUsecaseModule.UPDATE_MOVIE_USECASES)
    private readonly updateMovieUsecase: Usecase<
      IUsecase<UpdateMovieRequest, MovieDto>
    >,
  ) {}

  @Put(':id')
  @ApiResponseType(MovieDto, false)
  @ApiBody({ type: UpdateMovieRequest })
  @ResponseMessage(ResponseMessageDecorator.RESULT_UPDATED)
  @ApiOperation({ description: 'Update Movie' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id') id: string,
    @Body() request: UpdateMovieRequest,
  ): Promise<MovieDto> {
    request.id = id;
    return this.updateMovieUsecase.getInstance().execute(request);
  }
}
