import { ILogger } from '@domains/logger/logger.interface';
import { UserDto } from '@domains/models/dto/user.dto';
import { UserRepository } from '@domains/repositories/user-repository.interface';
import { ICryptoService } from '@domains/services/crypto-service.interface';
import { IUsecase } from '@domains/usecase/usecase.interface';

export class UserJwtUsecase implements IUsecase<string, UserDto> {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
    private readonly cryptoService: ICryptoService,
  ) {}

  async execute(request: string): Promise<UserDto> {
    this.logger.log(
      'UserJwtUsecase execute',
      `The user ${request} have been logged.`,
    );
    const user = await this.userRepository.getByUsername(request);
    if (!user) {
      return null;
    }
    return user.toUserDto(this.cryptoService);
  }
}
