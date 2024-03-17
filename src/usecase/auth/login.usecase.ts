import { ILogger } from '@domains/logger/logger.interface';
import { UserDto } from '@domains/models/dto/user.dto';
import { LoginUserRequest } from '@domains/models/request/user/login-user.request';
import { UserRepository } from '@domains/repositories/user-repository.interface';
import { IBcryptService } from '@domains/services/bcrypt-service.interface';
import { ICryptoService } from '@domains/services/crypto-service.interface';
import { IUsecase } from '@domains/usecase/usecase.interface';

export class LoginUsecase implements IUsecase<LoginUserRequest, UserDto> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
    private readonly cryptoService: ICryptoService,
  ) {}

  async execute(request: LoginUserRequest): Promise<UserDto> {
    const user = await this.userRepository.getByUsername(request.username);
    if (!user) {
      return null;
    }
    const match = await this.bcryptService.compare(
      request.password,
      user.password,
    );
    if (user && match) {
      // await this.updateLoginTime(user.username);
      return user.toUserDto(this.cryptoService);
    }
    return null;
  }
}
