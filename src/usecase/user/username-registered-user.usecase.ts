import { IUsecase } from '../../domains/usecase/usecase.interface';
import { UserRepository } from '../../domains/repositories/user-repository.interface';

export class UsernameRegisteredUserUsecase
  implements IUsecase<string, boolean>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: string): Promise<boolean> {
    return await this.userRepository.isUsernameRegistered(request);
  }
}
