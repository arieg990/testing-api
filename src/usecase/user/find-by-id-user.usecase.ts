import { IException } from '@domains/exception/exceptions.interface';
import { ILogger } from '@domains/logger/logger.interface';
import { IUsecase } from '@domains/usecase/usecase.interface';
import { UserDto } from '@domains/models/dto/user.dto';
import { UserRepository } from '@domains/repositories/user-repository.interface';
import { CryptoService } from '@core/services/crypto/crypto.service';
import { UserSimpleDto } from '@domains/models/dto/user-simple.dto';

export class FindByIdUserUsecase implements IUsecase<string, UserSimpleDto> {
  constructor(
    private readonly logger: ILogger,
    private readonly exceptionService: IException,
    private readonly userRepository: UserRepository,
    private readonly cryptoService: CryptoService,
  ) {}

  async execute(request: string): Promise<UserDto> {
    const idDecrypt = await this.cryptoService.decrypt(request);
    const id = Number.parseInt(idDecrypt);
    if (Number.isNaN(id)) {
      this.exceptionService.notFoundException();
    }
    const user = await this.userRepository.getById(id);
    if (!user) {
      this.exceptionService.notFoundException();
    }

    const userDto = user.toUserDto(this.cryptoService);
    this.logger.debug(FindByIdUserUsecase.name, 'find user by id');
    return userDto;
  }
}
