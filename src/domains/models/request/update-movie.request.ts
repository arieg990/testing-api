import { ApiProperty } from '@nestjs/swagger';
import { MovieModel } from '@domains/models/movie.model';

export class UpdateMovieRequest {
  id: string;

  @ApiProperty({ required: false })
  name: string;
  @ApiProperty({ required: false })
  description: string;

  toMovieModel(): MovieModel {
    const movieModel = new MovieModel();
    movieModel.name = this.name;
    movieModel.description = this.description;
    return movieModel;
  }
}
