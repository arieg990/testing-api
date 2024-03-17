import { FileValidator } from '@nestjs/common';
import { MulterFile } from '@webundsoehne/nest-fastify-file-upload';
import * as gjv from 'geojson-validation';

export class GeoJsonFileValidator extends FileValidator<any, MulterFile> {
  isValid(file?: MulterFile): boolean | Promise<boolean> {
    const data = JSON.parse(file.buffer.toString());
    if (gjv.valid(data)) return true;
    //   cb(null, false);
    return false;
  }
  buildErrorMessage(): string {
    throw new Error('File is not GeoJson Object');
  }
}
