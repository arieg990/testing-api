import { Inject, Injectable } from '@nestjs/common';
import { EntityModule } from '@core/entity/entity.module';
import { Movie } from '@core/entity/movie.entity';
import { BaseDbRepository } from '@core/repositories/base-db.repository';
import { MovieModel } from '@domains/models/movie.model';

@Injectable()
export class MovieDbRepository extends BaseDbRepository<MovieModel, Movie> {
  protected fieldName = ['name', 'description'];
  constructor(
    @Inject(EntityModule.MOVIE_ENTITY)
    model: typeof Movie,
  ) {
    super(model);
  }
}
