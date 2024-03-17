import { ApiProperty } from '@nestjs/swagger';
import { MulterFile } from '@webundsoehne/nest-fastify-file-upload';
import { IsNotEmpty } from 'class-validator';
import { GeoModel } from '@domains/models/geo.model';
import { ICryptoService } from '@domains/services/crypto-service.interface';

export class UploadGeoRequest {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true,
    example: 'west-java.json',
  })
  @IsNotEmpty()
  file: MulterFile;
  user_id: string;

  async toGeoModel(
    cryptoService: ICryptoService,
    path: string,
  ): Promise<GeoModel> {
    const model = new GeoModel();
    model.file_path = path;
    model.user_id = await cryptoService.decrypt(this.user_id);
    return model;
  }
}
