import { Module } from '@nestjs/common';
import { CreateMovieController } from '@core/controller/movie/create-movie.controller';
import { GetAllMovieController } from '@core/controller/movie/get-all-movie.controller';
import { GetByIdMovieController } from '@core/controller/movie/get-by-id-movie.controller';
import { UpdateMovieController } from '@core/controller/movie/update-movie.controller';
import { MovieUsecaseModule } from '@core/usecase/movie-usecase.module';

@Module({
  imports: [MovieUsecaseModule.register()],
  controllers: [
    CreateMovieController,
    UpdateMovieController,
    GetByIdMovieController,
    GetAllMovieController,
  ],
})
export class MovieControllerModule {}
