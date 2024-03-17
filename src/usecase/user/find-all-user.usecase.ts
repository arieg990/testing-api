import { PaginatorDto } from '@domains/models/paginator/paginator.dto';
import { ICryptoService } from '@domains/services/crypto-service.interface';
import { ILogger } from '@domains/logger/logger.interface';
import { IUsecase } from '@domains/usecase/usecase.interface';
import { UserDto } from '@domains/models/dto/user.dto';
import { UserRepository } from '@domains/repositories/user-repository.interface';
import { FilterRequest } from '@domains/models/request/filter.request';

export class FindAllUserUsecase
  implements IUsecase<FilterRequest, PaginatorDto<UserDto>>
{
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
    private readonly cryptoService: ICryptoService,
  ) {}

  async execute(request: FilterRequest): Promise<PaginatorDto<UserDto>> {
    const option = {
      crypto: ['id'],
      cryptoService: this.cryptoService,
      func: 'toUserDto',
    };
    request = { ...request, option };
    const result = await this.userRepository.findAll(request);
    this.logger.debug(FindAllUserUsecase.name, 'find User List');
    return result;
  }
}
