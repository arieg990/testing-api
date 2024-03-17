import { SeedApiClient } from '@core/common/seeders/api-client.seed';
import { DatabaseModule } from '@core/database/database.module';
import { EntityModule } from '@core/entity/entity.module';
import { User } from '@core/entity/user.entity';
import { BcryptModule } from '@core/services/bcrypt/bcrypt.module';
import { seeder } from 'nestjs-seeder';

seeder({
  imports: [DatabaseModule, BcryptModule],
  providers: [...EntityModule.register()],
}).run([SeedApiClient, User]);
