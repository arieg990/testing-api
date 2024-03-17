import { EntityModule } from '@core/entity/entity.module';
import { BaseDbRepository } from '@core/repositories/base-db.repository';
import { UserRepository } from '@domains/repositories/user-repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { UserModel } from '@domains/models/user/user.model';

@Injectable()
export class UserDbRepository
  extends BaseDbRepository<UserModel, User>
  implements UserRepository
{
  protected fieldName = ['name', 'username', 'dob'];
  constructor(
    @Inject(EntityModule.USER_ENTITY)
    private readonly userEntityRepository: typeof User,
  ) {
    super(userEntityRepository);
  }

  async isUsernameRegistered(username: string): Promise<boolean> {
    const user = await this.userEntityRepository.findOne({
      where: {
        username: username,
      },
    });
    return user != null;
  }

  async getByUsername(username: string): Promise<User> {
    return await this.userEntityRepository.findOne({
      where: {
        username: username,
      },
    });
  }
}
