import { IException } from '@domains/exception/exceptions.interface';
import { ILogger } from '@domains/logger/logger.interface';
import { IUsecase } from '@domains/usecase/usecase.interface';
import { UserDto } from '@domains/models/dto/user.dto';
import { UserRepository } from '@domains/repositories/user-repository.interface';
import { UpdateUserRequest } from '@domains/models/request/user/update-user.request';
import { CryptoService } from '@core/services/crypto/crypto.service';

export class UpdateUserUsecase implements IUsecase<UpdateUserRequest, UserDto> {
  constructor(
    private readonly logger: ILogger,
    private readonly exceptionService: IException,
    private readonly userRepository: UserRepository,
    private readonly cryptoService: CryptoService,
  ) {}

  async execute(request: UpdateUserRequest): Promise<UserDto> {
    const idDecrypt = await this.cryptoService.decrypt(request.id);
    const id = Number.parseInt(idDecrypt);
    if (Number.isNaN(id)) {
      this.exceptionService.badRequestException({
        message: 'Failed update user',
      });
    }

    const user = await this.userRepository.update(
      id,
      request.toUserModel(),
    );
    this.logger.debug(UpdateUserUsecase.name, 'user updated');
    return user.toUserDto(this.cryptoService);
  }
}
