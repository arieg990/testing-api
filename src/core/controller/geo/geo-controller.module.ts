import { Module } from '@nestjs/common';
import { GetAllGeoController } from '@core/controller/geo/get-all-geo.controller';
import { GetByIdGeoController } from '@core/controller/geo/get-by-id-geo.controller';
import { UploadGeoController } from '@core/controller/geo/upload-geo.controller';
import { GeoUsecaseModule } from '@core/usecase/geo-usecase.module';

@Module({
  imports: [GeoUsecaseModule.register()],
  controllers: [UploadGeoController, GetByIdGeoController, GetAllGeoController],
})
export class GeoControllerModule {}
