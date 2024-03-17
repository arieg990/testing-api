import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { MovieModel } from '@domains/models/movie.model';

export class CreateMovieRequest {
  @ApiProperty({ example: 'The legend of aang' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'American Animation' })
  @IsNotEmpty()
  description: string;

  toMovieModel(): MovieModel {
    const model = new MovieModel();
    model.name = this.name;
    model.description = this.description;
    return model;
  }
}
