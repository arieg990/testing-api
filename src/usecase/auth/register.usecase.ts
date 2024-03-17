import { IException } from '@domains/exception/exceptions.interface';
import { ILogger } from '@domains/logger/logger.interface';
import { UserDto } from '@domains/models/dto/user.dto';
import { RegisterUserRequest } from '@domains/models/request/user/register-user.request';
import { UserModel } from '@domains/models/user/user.model';
import { UserRepository } from '@domains/repositories/user-repository.interface';
import { IBcryptService } from '@domains/services/bcrypt-service.interface';
import { ICryptoService } from '@domains/services/crypto-service.interface';
import { IUsecase } from '@domains/usecase/usecase.interface';

export class RegisterUsecase implements IUsecase<RegisterUserRequest, UserDto> {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
    private readonly cryptoService: ICryptoService,
    private readonly exceptionService: IException,
  ) {}

  async execute(request: RegisterUserRequest): Promise<UserDto> {
    const userAlreadyRegistered =
      await this.userRepository.isUsernameRegistered(request.username);
    if (userAlreadyRegistered) {
      this.exceptionService.badRequestException({
        message: 'User already exists',
      });
    }
    request.password = await this.bcryptService.hash(request.password);
    const user = await this.userRepository.create(this.toUserModel(request));

    if (user) {
      // await this.updateLoginTime(user.username);
      return user.toUserDto(this.cryptoService);
    }
    return null;
  }

  toUserModel(request: RegisterUserRequest): UserModel {
    const user = new UserModel();
    user.name = request.name;
    user.dob = request.dob;
    user.gender = request.gender;
    user.username = request.username;
    user.password = request.password;
    return user;
  }
}
