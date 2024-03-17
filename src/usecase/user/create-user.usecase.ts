import { ILogger } from '@domains/logger/logger.interface';
import { IUsecase } from '@domains/usecase/usecase.interface';
import { CreateUserRequest } from '@domains/models/request/user/create-user.request';
import { UserDto } from '@domains/models/dto/user.dto';
import { UserRepository } from '@domains/repositories/user-repository.interface';
import { CryptoService } from '@core/services/crypto/crypto.service';
import { BcryptService } from '@core/services/bcrypt/bcrypt.service';

export class CreateUserUsecase implements IUsecase<CreateUserRequest, UserDto> {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
    private readonly cryptoService: CryptoService,
    private readonly bcryptService: BcryptService,
  ) {}

  async execute(request: CreateUserRequest): Promise<UserDto> {
    request.password = await this.bcryptService.hash(request.password);
    const user = await this.userRepository.create(request.toUserModel());
    const userDto = user.toUserDto(this.cryptoService);
    this.logger.debug(CreateUserUsecase.name, 'user created');
    return userDto;
  }
}
