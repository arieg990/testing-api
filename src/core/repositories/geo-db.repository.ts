import { Inject, Injectable } from '@nestjs/common';
import { EntityModule } from '@core/entity/entity.module';
import { Geo } from '@core/entity/geo.entity';
import { BaseDbRepository } from '@core/repositories/base-db.repository';
import { GeoModel } from '@domains/models/geo.model';

@Injectable()
export class GeoDbRepository extends BaseDbRepository<GeoModel, Geo> {
  protected fieldName = ['file_path'];
  constructor(
    @Inject(EntityModule.GEO_ENTITY)
    model: typeof Geo,
  ) {
    super(model);
  }
}
