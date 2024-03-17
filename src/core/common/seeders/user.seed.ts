import { Inject, Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { EntityModule } from '@core/entity/entity.module';
import { User } from '@core/entity/user.entity';
import { BcryptService } from '@core/services/bcrypt/bcrypt.service';
import { UserModel } from '@domains/models/user/user.model';

@Injectable()
export class SeedUser implements Seeder {
  constructor(
    @Inject(EntityModule.USER_ENTITY)
    private readonly entity: typeof User,
    private readonly bcryptService: BcryptService,
  ) {}

  async seed(): Promise<any> {
    const model = new UserModel();
    model.username = 'admin@admin.com';
    model.password = await this.bcryptService.hash('Secret123');
    return this.entity.create(model);
  }
  drop(): Promise<any> {
    return this.entity.destroy();
  }
}
