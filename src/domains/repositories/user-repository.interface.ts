import { BaseRepository } from '@domains/repositories/base-repository.interface';
import { User } from '@core/entity/user.entity';
import { UserModel } from '../models/user/user.model';

export interface UserRepository extends BaseRepository<UserModel, User>{
  getByUsername(username: string): Promise<User>;
  isUsernameRegistered(username: string): Promise<boolean>;
}
